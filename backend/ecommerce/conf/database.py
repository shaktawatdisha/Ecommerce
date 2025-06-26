import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv("DATABASE_NAME"),
        'USER': os.getenv("DATABASE_USER"),
        'PASSWORD': os.getenv("DATABASE_PASSWORD"),
        'HOST': os.getenv("DATABASE_HOST"),
        'PORT': os.getenv("DATABASE_PORT"),
    }
}
print('➡ ecommerce/conf/database.py:13 DATABASES:', DATABASES)
print('➡ ecommerce/conf/database.py:13 Name:', os.getenv("DATABASE_NAME"))