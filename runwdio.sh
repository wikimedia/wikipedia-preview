#!/bin/bash

arrIN=(${PACKAGE_NAMES// / })
for conf in "${arrIN[@]}"
do
	echo "running $conf: "
    npx wdio $conf
done
