#!/usr/bin/env bash

exists=`git show-ref refs/heads/gh-pages`
if [ -n "$exists" ]; then
    git checkout gh-pages
    else
    git checkout -b gh-pages
fi