#!/bin/bash
set -e

mongoimport --db lines --collection lines --file /data/lines.json --jsonArray

echo "Database initialized with lines data"
