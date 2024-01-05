---
title: Transformers
---

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

- [Attention is all you need (Transformer) - Model explanation (including math), Inference and Training](https://www.youtube.com/watch?v=bCz4OMemCcA&ab_channel=UmarJamil)

  - rnn

    - slow
    - vanishing or exploding gradients
      - video .. too much math
    - last token will not depend much on the first token (long text start still relevant to context of word at the end)
      - transformer solves problem

  - encoder
    - connected to decoder
  - embedding
    - turn a "something" into a number that is associated with a list of numbers that represent its properties (automatically trained in our case)
  - decoder

- [Coding a Transformer from scratch on PyTorch, with full explanation, training and inference.](https://www.youtube.com/watch?v=ISNdQcPhsts&ab_channel=UmarJamil)

- [Confused which Transformer Architecture to use? BERT, GPT-3, T5, Chat GPT? Encoder Decoder Explained](https://www.youtube.com/watch?v=wuj8Hao1TT4&ab_channel=DatafuseAnalytics)

### Vanilla Transformers:

    Original architecture designed primarily for translation tasks.
    Used in sequence-to-sequence tasks like language translation.

### BERT (Bidirectional Encoder Representations from Transformers):

    Designed for understanding the context of a word in a sentence (bidirectional context).
    Used in tasks like question answering, sentiment analysis, and language understanding.

### GPT (Generative Pretrained Transformer):

    Optimized for generating coherent and contextually relevant text.
    Used in text generation, creative writing, and as conversational agents.

### T5 (Text-to-Text Transfer Transformer):

    Framed all NLP tasks as a text-to-text problem.
    Used for a variety of tasks, including translation, summarization, question answering, and more.

### Vision Transformers (ViT):

    Adapts transformer architecture for image classification.
    Breaks images into patches and treats them similarly to words in a sentence.

### Multimodal Transformers:

    Designed to handle multiple types of data (e.g., text and images) simultaneously.
    Used in tasks that require understanding of both visual and textual data.
