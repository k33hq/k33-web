#!/usr/bin/env bash

#
#  Script to deploy webflow landing pages to Firestore.
#

set -e

if [ -z "${BASH_VERSINFO}" ] || [ -z "${BASH_VERSINFO[0]}" ] || [ ${BASH_VERSINFO[0]} -lt 4 ]; then
  echo "This script requires Bash version >= 4"
  exit 1
fi

# select k33-prod project
firebase use k33-prod

# deploy
firebase deploy --only hosting:k33-platform
