#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:MediaComem/v-museum-tags-cms.git main:gh-pages

cd -