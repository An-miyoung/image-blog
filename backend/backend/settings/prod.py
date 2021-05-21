from os import environ
from .common import *

STATICFILES_STORAGE = "backend.storages.StaticAzureStorage"
DEFAULT_FILE_STORAGE = "ackend.storages.MediaAzureStorage"

# AZURE_ACCOUNT_NAME = os.environ["AZURE_ACCOUNT_NAME"]
# AZURE_ACCOUNT_KEY = os.environ["AZURE_ACCOUNT_KEY"]

AZURE_ACCOUNT_NAME = "popupbook"
AZURE_ACCOUNT_KEY = "dvew3XPkK9zqJehdae9QxrEvclZfIxEvEZJ/d5KnR6c31AROuq7l/zxtWPj+lXOdnSd4kMcM0slU6DzEKgwvlg=="
