import sys
from pathlib import Path
import tree_sitter_python as tspython
from tree_sitter import Language, Parser, Query, QueryCursor

PY = Language(tspython.language())
parser = Parser(PY)

Q_TODO = Query(PY, '((comment) @c (#match? @c "TODO|FIXME"))')
Q_FUNC = Query(PY, "(function_definition name: (identifier) @nama) @fungsi")

def cari_error(node):
    if node.is_error or node.is_missing:
        return node
    for child in node.children:
        hasil = cari_error(child)
        if hasil:
            return hasil
    return None

SKIP = {"venv", ".venv", ".git", "node_modules"}
def cek_file(path):
    tree = parser.parse(path.read_bytes())

    # Fitur 1: komentar TODO/FIXME (sudah jadi)
    for node in QueryCursor(Q_TODO).captures(tree.root_node).get("c", []):
        print(f"{path}:{node.start_point[0] + 1}: {node.text.decode().strip()}")

    # Fitur 2: fungsi lebih dari 30 baris
    for _, cap in QueryCursor(Q_FUNC).matches(tree.root_node):
        f = cap["fungsi"][0]
        nama = cap["nama"][0].text.decode(errors="replace")
        baris = f.end_point[0] - f.start_point[0] + 1
        if baris > 30:
            print(f"{path}:{f.start_point[0] + 1}: fungsi {nama} panjang ({baris} baris)")
            
    # Fitur 3: file dengan error sintaks
    if tree.root_node.has_error:
        e = cari_error(tree.root_node)
        if e:
            print(f"{path}:{e.start_point[0] + 1}: ada error sintaks")

for path in Path(sys.argv[1]).rglob("*.py"):
    if SKIP & set(path.parts):
        continue
    cek_file(path)