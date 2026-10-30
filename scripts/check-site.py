"""Check static navigation, metadata and bilingual routes without network access."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'site'
ORIGIN = 'https://mydy.kr'

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.meta, self.h1 = [], [], {}, 0
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'a' and a.get('target') == '_blank':
            assert 'noopener' in a.get('rel', '').split(), 'New-tab link lacks noopener'
        if tag == 'link' and a.get('rel') == 'canonical': self.meta['canonical'] = a['href']
        if tag == 'link' and a.get('rel') == 'alternate': self.meta[a.get('hreflang')] = a['href']
        if tag == 'meta' and a.get('name') == 'description': self.meta['description'] = a.get('content')
        if tag == 'script' and a.get('src'): self.links.append(a['src'])
        if tag == 'link' and a.get('rel') in ['stylesheet', 'icon']: self.links.append(a['href'])

def route(file):
    path = '/' + file.relative_to(ROOT).as_posix()
    return path[:-10] if path.endswith('index.html') else path

pages = {route(file): Page(file.read_text()) for file in ROOT.rglob('*.html')}
for path, page in pages.items():
    assert page.h1 == 1, (path, 'Expected one H1')
    assert len(page.ids) == len(set(page.ids)), (path, 'Duplicate IDs')
    assert page.meta.get('canonical') == ORIGIN + path, (path, 'Canonical URL')
    assert page.meta.get('description'), (path, 'Missing description')
    for lang in ['ko', 'en']:
        other = page.meta.get(lang)
        assert other and urlsplit(other).path in pages, (path, 'Missing translated route', lang)
        assert pages[urlsplit(other).path].meta.get(lang) == other, (path, 'Inconsistent language route')
    for href in page.links:
        target = urlsplit(urljoin(ORIGIN + path, href))
        if target.netloc != 'mydy.kr' or target.scheme not in ['https', 'http']: continue
        file = ROOT / unquote(target.path).lstrip('/')
        if target.path.endswith('/'): file /= 'index.html'
        assert file.is_file(), (path, 'Broken local link', href)
        if target.fragment and target.path in pages:
            assert unquote(target.fragment) in pages[target.path].ids, (path, 'Missing anchor', href)
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
listed = {loc.text for loc in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc', ns)}
assert listed == {ORIGIN + path for path in pages}, 'Sitemap differs from public HTML routes'
print(f'PASS: {len(pages)} pages, links, anchors, canonical URLs, language pairs and sitemap')
