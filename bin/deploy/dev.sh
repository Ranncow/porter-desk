#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}
DIR_NODE="${DIR_ROOT}/node_modules"
DIR_OWN="${DIR_ROOT}/own_modules"

##
# Internal function to clone & link one GitHub repo
##
processRepo() {
  NAME="@${1}"
  REPO="https://github.com/${1}.git"
  if test ! -d "${DIR_OWN}/${NAME}"; then
    echo "Clone repo '${NAME}' to '${DIR_OWN}'."
    git clone "${REPO}" "${DIR_OWN}/${NAME}"
  fi
  echo "Link sources from '${NAME}' to '${DIR_NODE}'."
  rm -fr "${DIR_NODE:?}/${NAME}" && ln -s "${DIR_OWN}/${NAME}" "${DIR_NODE}/${NAME}"
}

##
# MAIN FUNCTIONALITY
##
echo "Remove installed dependencies and lock file."
rm -fr "${DIR_NODE}" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install --omit=optional

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_OWN}/@ranncow/"
mkdir -p "${DIR_OWN}/@teqfw/"

processRepo "ranncow/porter-base"
processRepo "teqfw/core"
processRepo "teqfw/db"
processRepo "teqfw/di"
processRepo "teqfw/email"
processRepo "teqfw/i18n"
processRepo "teqfw/test"
processRepo "teqfw/ui-quasar"
processRepo "teqfw/vue"
processRepo "teqfw/web"
processRepo "teqfw/web-api"
processRepo "teqfw/web-source-installer"

echo ""
echo "App deployment in 'dev' mode is done."
