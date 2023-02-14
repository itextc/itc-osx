from setuptools import setup

APP = ['itc.py'] # replace 'my_script.py' with the name of your Python script
DATA_FILES = ['resources'] # include any additional data files that should be bundled with the app (e.g. images, configuration files)
OPTIONS = {
    'argv_emulation': False, # use this option if your script requires command line arguments
    'iconfile': 'icon.icns', # replace 'my_icon.icns' with the name of your app icon file
    'plist': {
        'CFBundleName': 'Islāmic Text Copier', # replace 'My App Name' with the name of your app
        'CFBundleDisplayName': 'Islāmic Text Copier', # replace 'My App Name' with the name of your app
        'CFBundleGetInfoString': 'This is a simple text copying program. The goal of this app is simple; give the user easy access to commonly used Arabic texts on their PC, such as Subḥānahu wa Taʾālá and Sallá Allāhu ʿAlayhī wa as-Salam.', # replace 'My App Description' with a short description of your app
        'CFBundleVersion': '1', # replace '0.1' with the version number of your app
        'CFBundleShortVersionString': '1', # replace '0.1' with the version number of your app
        'CFBundleIdentifier': 'com.itc.islamictextcopier' # replace 'com.example.myapp' with a unique identifier for your app
    }
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app']
)
