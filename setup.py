from setuptools import setup

APP = ['itc.py'] # replace 'my_script.py' with the name of your Python script
DATA_FILES = ['resources'] # include any additional data files that should be bundled with the app (e.g. images, configuration files)
OPTIONS = {
    'iconfile': 'icon.icns',
    'plist': {
        'CFBundleName': 'Islamic Text Copier',
        'CFBundleDisplayName': 'Islamic Text Copier',
        'CFBundleIdentifier': 'com.itc.islamictextcopier',
        'CFBundleVersion': '1.0.0',
        'CFBundleShortVersionString': '1.0.0',
        'CFBundleSupportedPlatforms': ['MacOSX'],
        'CFBundleGetInfoString': 'This is a simple text copying program. The goal of this app is simple; give the user easy access to commonly used Arabic texts on their PC, such as Subḥānahu wa Taʾālá and Sallá Allāhu ʿAlayhī wa as-Salam.',
        'CFBundleExecutable': 'Islamic Text Copier',
        'CFBundlePackageType': 'APPL',
        'CFBundleInfoDictionaryVersion': '6.0',
        'LSArchitecturePriority': ['x86_64', 'arm64'],
        'CFBundleURLTypes': [
            {
                'CFBundleURLName': 'com.itc.islamictextcopier',
                'CFBundleURLSchemes': ['islamictextcopier']
            }
        ]
    },
    'arch': 'universal',
    'packages': ['ctypes', 'customtkinter', 'pyperclip', 'subprocess', 'tkinter'],
    'includes': ['PIL', 'pyglet'],
    'site_packages': True,
    'excludes': ['numpy', 'scipy'],
    'optimize': 2,
    'semi_standalone': True,
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
    name='Islāmic Text Copier'
)
