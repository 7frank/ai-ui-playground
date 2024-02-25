import { $ } from "bun";

export async function convertTextToSpeech(text: string) {
  const baseUrl = "http://localhost:5002/api/tts";
  const outFile = "audio.wav";
  await $`curl -o ${outFile} '${baseUrl}?text=${encodeURI(
    text
  )}&speaker_id=p364&style_wav=&language_id=' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: http://localhost:5002/' -H 'Connection: keep-alive' -H 'Cookie: ph_phc_dIMJYXrcjOxMJ1NhSsKASNaqw7ZsVYDXJdOoiaSWYWB_posthog=%7B%22distinct_id%22%3A%22018aa7c3-c935-7264-83a4-c664a7add7b0%22%2C%22%24device_id%22%3A%22018aa7c3-c935-7264-83a4-c664a7add7b0%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22%24session_recording_enabled_server_side%22%3Atrue%2C%22%24console_log_recording_enabled_server_side%22%3Atrue%2C%22%24session_recording_recorder_version_server_side%22%3A%22v2%22%2C%22%24sesid%22%3A%5B1696250149079%2C%22018af063-38ba-7b54-8f26-7feea8ba9e1e%22%2C1696250149050%5D%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; ajs_anonymous_id=06f70080-8cc6-4fb9-9dfb-8f84e5cdf8a0; _hp2_id.1680123994=%7B%22userId%22%3A%224252074301843498%22%2C%22pageviewId%22%3A%226669716465389219%22%2C%22sessionId%22%3A%224438489117262307%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' `;

  return outFile;
}

export async function createVideoWithThumbnail(imagePath:string, audioPath:string) {}
