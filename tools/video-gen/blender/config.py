import bpy
import os

## # Add an image
# image_path = "tools/video-gen/assets/Arc/S1E1/images/img001.webp"
 #audio_path = ".out/S1E1/result.wav

# Paths to your files
audio_files = ['/path/to/audio1.mp3', '/path/to/audio2.mp3']
image_files = ['/path/to/image1.jpg', '/path/to/image2.jpg', '/path/to/image3.jpg']
ambient_audio_file = '/path/to/ambient.mp3'
logo_image = '/path/to/logo.png'

# Clear existing sequences
bpy.context.scene.sequence_editor_clear()

# Function to add audio
def add_audio(filepath, channel, start_frame):
    bpy.context.scene.sequence_editor.sequences.new_sound("Audio", filepath, channel, start_frame)

# Function to add images
def add_image(filepath, channel, start_frame, end_frame):
    seq = bpy.context.scene.sequence_editor.sequences.new_image("Image", filepath, channel, start_frame)
    seq.frame_final_end = end_frame

# Function to add ambient audio
def add_ambient_audio(filepath, channel, start_frame):
    bpy.context.scene.sequence_editor.sequences.new_sound("AmbientAudio", filepath, channel, start_frame)

# Calculate total audio length and add audios
total_audio_length = 0
for audio_file in audio_files:
    add_audio(audio_file, 1, total_audio_length)
    # Here you'd dynamically calculate total_audio_length based on the audio file's duration
    # Placeholder value for demonstration
    total_audio_length += 100  # Assuming 100 frames per audio file for this example

# Add ambient audio
add_ambient_audio(ambient_audio_file, 2, 0)

# Add images as slideshow
image_display_length = total_audio_length // len(image_files)
for i, image_file in enumerate(image_files):
    start_frame = i * image_display_length
    end_frame = start_frame + image_display_length
    add_image(image_file, 3, start_frame, end_frame)

# Add logo with fade in and out
logo_strip = bpy.context.scene.sequence_editor.sequences.new_image("Logo", logo_image, 4, 2)
logo_strip.frame_final_end = 7 * 24  # Assuming 24 fps
# Add fade in and fade out effect for logo
fade = bpy.context.scene.sequence_editor.sequences.new_effect("Fade", 'GAMMA_CROSS', 4, 2, logo_strip)
fade.frame_final_end = 7 * 24  # Adjust fade duration as needed

# Note: This script does not handle the dynamic calculation of audio lengths or frame rate adjustments.
# You might need to adjust the timing and frame rate to match your audio and desired slideshow timing.
