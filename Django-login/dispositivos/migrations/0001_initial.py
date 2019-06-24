# Generated by Django 2.2.1 on 2019-06-19 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dispositivos',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=200)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('concepto', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'dispositivos',
                'managed': False,
            },
        ),
    ]