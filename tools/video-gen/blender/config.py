import bpy
import os
# import glob
import wave
import math 
from wcmatch import glob

import sys

print(sys.exec_prefix)



# Select and delete default cube, light, and camera
for obj in ('Cube', 'Light', 'Camera'):
    if obj in bpy.data.objects:
        bpy.data.objects[obj].select_set(True)  # Select the object
    else:
        bpy.data.objects[obj].select_set(False)  # Deselect if not the object to delete

# Use bpy.ops to delete the selected objects
bpy.ops.object.delete()


# Ensure sequence editor is initialized
if bpy.context.scene.sequence_editor is None:
    bpy.context.scene.sequence_editor_create()

# Paths to your files
ambient_audio_file = 'assets/ambient/birds-chirping.mp3'
logo_image = 'assets/logo/logo.webp'

# Patterns to your files
image_pattern = 'assets/Arc/S1E1/images/img*.{webp,png}'
audio_pattern = '.out/S1E1/*_*.wav'

# Desired frame rate (e.g., 24 frames per second)
desired_fps = 1
output_file = '.out/blender_video.mp4'  
output_format = 'FFMPEG'  


# Specify the output file and format
bpy.context.scene.render.filepath = output_file
bpy.context.scene.render.image_settings.file_format = output_format
bpy.context.scene.render.ffmpeg.format = 'MPEG4'
bpy.context.scene.render.ffmpeg.codec = 'H264'  # Example codec

bpy.context.scene.render.ffmpeg.audio_codec = 'AAC'
bpy.context.scene.render.ffmpeg.audio_bitrate = 192


bpy.context.scene.render.resolution_x = 1024
bpy.context.scene.render.resolution_y = 768
bpy.context.scene.render.resolution_percentage = 100

def get_wav_duration(wav_file_path):
    """
    Calculates the duration of a WAV file.

    Args:
    - wav_file_path: The file path to the WAV file.

    Returns:
    - The duration of the WAV file in seconds.
    """
    with wave.open(wav_file_path, 'r') as wav_file:
        frames = wav_file.getnframes()
        rate = wav_file.getframerate()
        duration = frames / float(rate)
        return duration

# Function to find and sort files by modification time or name
def find_and_sort_files(pattern, sort_by='name'):
    # files = glob.glob(pattern, recursive=True) # default glob
    files = glob.glob(pattern, flags=glob.BRACE) #wcmatch glob
    if sort_by == 'date':
        files.sort(key=os.path.getmtime)
    else:
        files.sort()
    return files


# Function to clear existing sequences
def clear_sequences():
    bpy.context.scene.sequence_editor_clear()

# Function to add audio
def add_audio(filepath, channel, start_frame):
    bpy.context.scene.sequence_editor.sequences.new_sound("Audio", filepath, channel, start_frame)

# Function to add images
def add_image(filepath, channel, start_frame, end_frame):
    seq = bpy.context.scene.sequence_editor.sequences.new_image("Image", filepath, channel, round(start_frame))
    seq.frame_final_end = round(end_frame)

# Function to add ambient audio
def add_ambient_audio(filepath, channel, start_frame):
    bpy.context.scene.sequence_editor.sequences.new_sound("AmbientAudio", filepath, channel, start_frame)

# Main script execution
def main(image_pattern, audio_pattern, ambient_audio_file, logo_image, desired_fps):
    # Note running this will delete the sequencer so we keep it out
    # clear_sequences()
    
    # Set the desired frame rate
    bpy.context.scene.render.fps = desired_fps

    # Find and sort image and audio files
    image_files = find_and_sort_files(image_pattern)

    print(image_files)

    audio_files = find_and_sort_files(audio_pattern)

    print(audio_files)

    # Calculate total audio length and add audios
    total_audio_length = 0
    for audio_file in audio_files:
        audio_duration = get_wav_duration(audio_file)

        _total_audio_length = round(total_audio_length)
        add_audio(audio_file, 1, _total_audio_length)
        total_audio_length += audio_duration * bpy.context.scene.render.fps  # Convert seconds to frames

    # Add ambient audio
    add_ambient_audio(ambient_audio_file, 2, 0)

    # Add images as slideshow
    if image_files:  # Ensure there are images to process
        image_display_length = total_audio_length // len(image_files)
        for i, image_file in enumerate(image_files):
            start_frame = i * image_display_length
            end_frame = start_frame + image_display_length
            add_image(image_file, 3, start_frame, end_frame)

    # Add logo with fade in and out
    logo_strip = bpy.context.scene.sequence_editor.sequences.new_image("Logo", logo_image, 4, 0)
    logo_strip.frame_start = 2 * desired_fps
    logo_strip.frame_final_end = 5 * desired_fps  # Display logo for the duration of the audio
    # Add fade in and fade out effect for logo
    
    # Example: Add a color strip for fading to black
    color_strip = bpy.context.scene.sequence_editor.sequences.new_effect(
        name="Color",
        type='COLOR',
        channel=3,  # Ensure this is on a separate channel
        frame_start=0,
        frame_end=logo_strip.frame_final_end  # Match the end to your logo strip or desired fade duration
    )
    color_strip.color = (0, 0, 0)  # Black

    
    # Adjusting the fade effect to use both the logo and the newly added color strip
    fade = bpy.context.scene.sequence_editor.sequences.new_effect(
        name="Fade",
        type='GAMMA_CROSS',
        channel=4,  # Place this above the previous strips
        frame_start=0,
        frame_end=logo_strip.frame_final_end,
        seq1=logo_strip,
        seq2=color_strip  # The second sequence for the fade
    )   

# Execute the script
main(image_pattern, audio_pattern, ambient_audio_file, logo_image, desired_fps)
