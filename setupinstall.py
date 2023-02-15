import os
import sys
from PyInstaller.utils.hooks import collect_data_files
from setuptools import setup

APP_NAME = 'Islamic Text Copier'
ICON_FILE = 'icon.icns'
VERSION = '1.0.0'

if getattr(sys, 'frozen', False):
    # For PyInstaller-built executables
    RESOURCE_DIR = os.path.join(sys._MEIPASS, 'resources')
else:
    # For running the script normally
    RESOURCE_DIR = 'resources'

APP = ['itc.py']
DATA_FILES = collect_data_files(RESOURCE_DIR)
OPTIONS = {
    'iconfile': ICON_FILE,
    'name': APP_NAME,
    'CFBundleName': APP_NAME,
    'CFBundleDisplayName': APP_NAME,
    'CFBundleIdentifier': 'com.itc.islamictextcopier',
    'CFBundleShortVersionString': VERSION,
    'CFBundleVersion': VERSION,
    'CFBundleExecutable': APP_NAME,
    'CFBundleGetInfoString': 'This is a simple text copying program. The goal '
                             'of this app is simple; give the user easy access '
                             'to commonly used Arabic texts on their PC, such as '
                             'Subḥānahu wa Taʾālá and Sallá Allāhu ʿAlayhī wa as-Salam.',
    'LSMinimumSystemVersion': '10.12',
    'plist_extra': {
        'LSArchitecturePriority': ['x86_64', 'arm64'],
        'CFBundleURLTypes': [
            {
                'CFBundleURLName': 'com.itc.islamictextcopier',
                'CFBundleURLSchemes': ['islamictextcopier']
            }
        ]
    },
    'packages': ['ctypes', 'customtkinter', 'pyperclip', 'subprocess', 'tkinter'],
    'includes': ['PIL', 'pyglet'],
    'excludes': ['numpy', 'scipy'],
    'optimize': 2,
    'semi_standalone': True,
}

APP_BUNDLE = {
    'name': APP_NAME,
    'version': VERSION,
    'author': "'Abdur-Rahmān Bilāl & Nāsīr 'Ātif",
    'url': 'https://itc.nasiratif.com',
    'description': 'A simple text copying program for commonly used Arabic texts',
    'icon': ICON_FILE,
    'license': 'MIT',
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'pyinstaller': OPTIONS},
    app_bundle=APP_BUNDLE,
    name=APP_NAME,
)
