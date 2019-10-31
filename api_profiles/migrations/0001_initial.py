# Generated by Django 2.2.6 on 2019-10-29 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('surname', models.CharField(max_length=10)),
                ('img', models.ImageField(default='image/images.jpg', upload_to='image/')),
                ('date_create', models.DateField(auto_now_add=True)),
                ('date_update', models.DateField(auto_now=True)),
            ],
        ),
    ]
