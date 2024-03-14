import json

# Charger les données depuis le fichier JSON
with open('input.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Trier les listes "stations" et "terminus" pour chaque élément de la liste
for item in data:
    item['stations'] = sorted(item['stations'])
    item['terminus'] = sorted(item['terminus'])

# Enregistrer les données triées dans un nouveau fichier JSON
with open('output.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

