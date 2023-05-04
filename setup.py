from setuptools import setup

APP = ['itc.py']
DATA_FILES = ['resources']
OPTIONS = {
    'argv_emulation': True,
    'plist': {
        'CFBundleName': 'Islamic Text Copier',
        'CFBundleDisplayName': 'Islamic Text Copier',
        'CFBundleIdentifier': 'com.itextc.itc',
        'CFBundleVersion': '1.0',
        'CFBundleShortVersionString': '1.0.0',
        'CFBundleIconFile': 'icon.icns',
        'LSUIElement': True,
        'NSRequiresAquaSystemAppearance': False,
        'NSAppTransportSecurity': {
            'NSAllowsArbitraryLoads': True
        }
    },
    'packages': ['tkinter', 'requests'],
    'includes': ['webbrowser', 'os', 'tkinter.messagebox', 'tkmacosx'],
    'frameworks': ['resources']
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
    iconfile='icon.icns'
)