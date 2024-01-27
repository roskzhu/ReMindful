# transcribe.py

from google.cloud import speech

def transcribe_streaming(audio_stream):
    """Transcribes the given audio stream using Google Speech-to-Text API."""
    client = speech.SpeechClient()

    requests = (speech.StreamingRecognizeRequest(audio_content=chunk) for chunk in audio_stream)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    streaming_config = speech.StreamingRecognitionConfig(config=config, interim_results=True)

    responses = client.streaming_recognize(config=streaming_config, requests=requests)

    # Concatenate transcriptions from the responses
    return ' '.join([result.alternatives[0].transcript for response in responses for result in response.results])
