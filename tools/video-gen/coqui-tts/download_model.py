import argparse
from TTS.utils.manage import ModelManager
from pathlib import Path

def parse_args():
    parser = argparse.ArgumentParser(description="Download TTS and Vocoder Models")
    parser.add_argument("--model_name", type=str, default="tts_models/en/ljspeech/tacotron2-DDC",
                        help="Name of the TTS model to download in format <language>/<dataset>/<model_name>")
    parser.add_argument("--vocoder_name", type=str, default=None,
                        help="Name of the vocoder model to download.")
    return parser.parse_args()

def download_model(model_name, vocoder_name=None):
    # Define the path to the model manager's configuration file
    model_manager_config_path = Path(__file__).parent / ".models.json"
    manager = ModelManager(model_manager_config_path)

    # Download the TTS model
    model_path, config_path, _ = manager.download_model(model_name)
    print(f"Downloaded TTS model: {model_path}")
    print(f"TTS model config: {config_path}")

    # If a vocoder name is provided, download the vocoder as well
    if vocoder_name:
        vocoder_path, vocoder_config_path, _ = manager.download_model(vocoder_name)
        print(f"Downloaded vocoder model: {vocoder_path}")
        print(f"Vocoder model config: {vocoder_config_path}")
    else:
        vocoder_path, vocoder_config_path = None, None

    return model_path, config_path, vocoder_path, vocoder_config_path

if __name__ == "__main__":
    args = parse_args()
    download_model(args.model_name, args.vocoder_name)
