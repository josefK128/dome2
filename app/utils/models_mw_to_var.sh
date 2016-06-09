#!/usr/bin/sh
# $bash silence.sh
# or $/usr/bin/bash silence.sh
# make backup first! It operates in-place!!!!
# replace mw.X by var X in all models
find . -type f -name '*.js' -exec sed --in-place 's/mw\./var /' {} \;
