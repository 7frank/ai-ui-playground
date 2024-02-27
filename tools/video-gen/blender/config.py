import bpy
import os
import glob

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
ambient_audio_file = '/path/to/ambient.mp3'
logo_image = '/path/to/logo.png'

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

bpy.context.scene.render.resolution_x = 1024
bpy.context.scene.render.resolution_y = 768
bpy.context.scene.render.resolution_percentage = 100



# Function to find and sort files by modification time or name
def find_and_sort_files(pattern, sort_by='name'):
    files = glob.glob(pattern, recursive=True)
    if sort_by == 'date':
        files.sort(key=os.path.getmtime)
    else:
        files.sort()
    return files

# Placeholder function to calculate audio length
def calculate_audio_length(filepath):
    # Placeholder: return length in frames. For example, 100 frames for each audio.
    return 1 # FIXME

# Function to clear existing sequences
def clear_sequences():
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

# Main script execution
def main(image_pattern, audio_pattern, ambient_audio_file, logo_image, desired_fps):
    clear_sequences()
    
    # Set the desired frame rate
    bpy.context.scene.render.fps = desired_fps

    # Find and sort image and audio files
    image_files = find_and_sort_files(image_pattern)
    audio_files = find_and_sort_files(audio_pattern)

    # Calculate total audio length and add audios
    total_audio_length = 0
    for audio_file in audio_files:
        audio_length = calculate_audio_length(audio_file)
        add_audio(audio_file, 1, total_audio_length)
        total_audio_length += audio_length

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
    logo_strip.frame_final_end = total_audio_length  # Display logo for the duration of the audio
    # Add fade in and fade out effect for logo
    fade = bpy.context.scene.sequence_editor.sequences.new_effect("Fade", 'GAMMA_CROSS', 4, 0, logo_strip)
    fade.frame_final_end = total_audio_length  # Adjust fade duration as needed

# Execute the script
main(image_pattern, audio_pattern, ambient_audio_file, logo_image, desired_fps)
