# Generated by Django 4.0.3 on 2022-04-27 07:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('singers', '0001_initial'),
        ('genres', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('release_date', models.DateField()),
                ('price', models.SmallIntegerField()),
                ('stock', models.SmallIntegerField()),
                ('image', models.BinaryField()),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='genres.genre')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumsSingers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='AlbumWithSingers', to='albums.album')),
                ('singer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='SingerWithAlbums', to='singers.singer')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='singer',
            field=models.ManyToManyField(through='albums.AlbumsSingers', to='singers.singer'),
        ),
    ]
