import re, json, os

content_path = r'C:\Users\satyaveer singh\.gemini\antigravity\brain\879944df-07a6-4e65-bd96-ffcc7f882fca\.system_generated\steps\14\content.md'
with open(content_path, 'r', encoding='utf-8') as f:
    text = f.read()

img_dir = 'public/images/products'
imgs = os.listdir(img_dir) if os.path.exists(img_dir) else []

def find_img(pid):
    for f in imgs:
        if f.startswith(f'{pid}_'):
            return f'/images/products/{f}'
    return ''

start_idx = text.find('const products = [')
end_idx = text.find('// Global cart state', start_idx)
if end_idx == -1:
    end_idx = text.find('];', start_idx) + 2

array_text = text[start_idx:end_idx]

lines = array_text.split('\n')
blocks = []
current_block = []
in_block = False

for line in lines:
    if '{ id:' in line:
        if in_block and current_block:
            blocks.append('\n'.join(current_block))
            current_block = []
        in_block = True
    if in_block:
        current_block.append(line)
        if line.strip().endswith('},') or line.strip() == '}':
            blocks.append('\n'.join(current_block))
            current_block = []
            in_block = False

if current_block:
    blocks.append('\n'.join(current_block))

def clean_text(s):
    if not s:
        return ''
    s = s.replace('\ufffd', ' · ').replace('·', ' · ')
    s = re.sub(r'\s*·\s*', ' · ', s)
    return re.sub(r'\s+', ' ', s).strip(' ·')

parsed_products = []
for block in blocks:
    id_m = re.search(r'id:\s*(\d+)', block)
    if not id_m:
        continue
    pid = int(id_m.group(1))

    name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
    name = name_m.group(1) if name_m else ''

    type_m = re.search(r"type:\s*['\"]([^'\"]+)['\"]", block)
    ptype = type_m.group(1) if type_m else 'skincare'

    tag_m = re.search(r"tag:\s*['\"]([^'\"]*)['\"]", block)
    tag = tag_m.group(1) if tag_m else ''

    price_m = re.search(r'price:\s*(\d+)', block)
    price = int(price_m.group(1)) if price_m else 0

    desc_m = re.search(r"desc:\s*['\"]([^'\"]+)['\"]", block)
    desc = clean_text(desc_m.group(1)) if desc_m else ''

    weight_m = re.search(r"netWeight:\s*['\"]([^'\"]+)['\"]", block)
    netWeight = weight_m.group(1) if weight_m else ('100 gm' if ptype == 'face' else '')

    shelf_m = re.search(r"shelfLife:\s*['\"]([^'\"]+)['\"]", block)
    shelfLife = shelf_m.group(1) if shelf_m else '12 Months'

    overview_m = re.search(r"overview:\s*['\"]([^'\"]+)['\"]", block)
    overview = overview_m.group(1) if overview_m else desc

    suitable_m = re.search(r"suitableFor:\s*['\"]([^'\"]+)['\"]", block)
    suitableFor = clean_text(suitable_m.group(1)) if suitable_m else 'All Skin Types'

    how_m = re.search(r"howToUse:\s*['\"]([^'\"]+)['\"]", block)
    howToUse = how_m.group(1) if how_m else ''

    ingr_m = re.search(r"ingredients:\s*(\[[^\]]+\])", block)
    ingredients = []
    if ingr_m:
        raw_ing = ingr_m.group(1)
        items = re.findall(r"['\"]([^'\"]+)['\"]", raw_ing)
        ingredients = items

    hamper_m = re.search(r"hamperNumber:\s*['\"]([^'\"]+)['\"]", block)
    hamperNumber = hamper_m.group(1) if hamper_m else None

    includes_m = re.search(r"includes:\s*(\[[^\]]+\])", block)
    includes = []
    if includes_m:
        raw_inc = includes_m.group(1)
        includes = re.findall(r"['\"]([^'\"]+)['\"]", raw_inc)

    parsed_products.append({
        'id': pid,
        'name': name,
        'type': ptype,
        'tag': tag,
        'price': price,
        'netWeight': netWeight,
        'shelfLife': shelfLife,
        'desc': desc,
        'overview': overview,
        'suitableFor': suitableFor,
        'howToUse': howToUse,
        'ingredients': ingredients,
        'hamperNumber': hamperNumber,
        'includes': includes,
        'image': find_img(pid),
        'isHero': pid == 1,
        'officialUrl': 'https://surrealtreasures.in/#shop'
    })

os.makedirs('src/data', exist_ok=True)
with open('src/data/products.js', 'w', encoding='utf-8') as out_f:
    out_f.write('export const products = ' + json.dumps(parsed_products, indent=2, ensure_ascii=False) + ';\n\n')
    out_f.write('export default products;\n')

print(f"Successfully cleaned and wrote {len(parsed_products)} products to src/data/products.js")
