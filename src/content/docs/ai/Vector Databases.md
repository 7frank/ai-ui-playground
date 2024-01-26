---
title: Vector Databases in AI
---

> ⚠ This section contains unchecked facts

Vector databases, also known as vector search engines or similarity search databases, are specialized database systems designed to efficiently store, manage, and perform queries on vector data. These vectors typically represent complex data types like images, audio, text, or even higher-dimensional data in a numerical format. The primary purpose of vector databases is to enable fast and accurate similarity searches within large datasets.

## Examples in AI Applications

-   Image Retrieval Systems: In applications like reverse image search, vector databases store embeddings of images. When a user queries with an image, the system finds and returns the most similar images.
-   Recommendation Systems: Used in e-commerce and content platforms to recommend products or content by comparing user profile vectors with item vectors.
-   Natural Language Processing (NLP): For tasks like semantic search, where text embeddings are used to find documents or entries that are semantically similar to a query.
-   Voice Recognition Systems: Storing voice feature vectors for tasks like identifying a speaker or matching a spoken phrase with stored audio clips.
-   Fraud Detection: In financial applications, vector databases can help identify unusual patterns or anomalies in transaction data.

## Popular Vector Database Systems

- Elasticsearch with Vector Search Plugins: Widely used for text-based searches; plugins extend its capabilities to handle vector data.
- Faiss (Facebook AI Similarity Search): Developed by Facebook, optimized for efficient similarity searching, particularly in clustering and indexing large datasets.
- Milvus: An open-source vector database designed for scalability and integrating machine learning models.


## Term "Embeddings" explained and compared between Vector Database & LLM

In both the LLM and vector database examples, the embeddings serve as a numerical representation of the input data (text or images). In LLMs, these embeddings capture linguistic and contextual information, enabling the model to perform tasks like sentiment analysis. In vector databases, the embeddings represent features of the data (like visual characteristics of images) and are used for efficient similarity searching.


### Creating Embeddings in LLMs (Example: Sentiment Analysis)

    Data Preparation: The input text, such as "I love this product," is tokenized. This means breaking it down into smaller units (tokens), which could be words or parts of words.

    - Initial Embedding Generation:
        Each token is mapped to an initial embedding. In a trained LLM, there's typically an embedding layer that has a pre-learned vector for each token in its vocabulary.
        For example, "I", "love", "this", and "product" are each mapped to a 5-dimensional vector. These vectors are learned from vast amounts of text data and are stored in the model.
        The vectors might look like random numbers but actually represent linguistic features learned during training. For instance, "love" might have a vector [0.5, 0.6, 0.7, 0.3, 0.2], which was learned from seeing "love" in many different contexts.

    - Contextualization:
        In advanced models like GPT-4, these embeddings are then processed through several neural network layers.
        These layers adjust the embeddings based on the context provided by surrounding words, allowing the model to understand the meaning in a specific context.


### Creating Text Embeddings in Vector Databases

    Data Preparation: The input text, such as "I love this product," is prepared for processing. This typically involves tokenization (breaking down the text into words or subwords) and sometimes normalization (like converting to lowercase).

    - Feature Extraction:
        Traditional Methods: In simpler systems, methods like TF-IDF (Term Frequency-Inverse Document Frequency) may be used. Each word in the text is assigned a numerical value based on its frequency in the document relative to its frequency across all documents. This method, however, does not capture semantic meanings.
        Word Embeddings: More advanced systems might use pre-trained word embeddings like Word2Vec or GloVe. These embeddings are learned from large corpora of text and represent words in a high-dimensional space where semantically similar words are closer together.
            For instance, "love" might have a pre-trained embedding like [0.5, 0.6, 0.7, 0.3, 0.2].
            Each word in "I love this product" is converted into a vector using these pre-trained embeddings.

    - Combining Word Embeddings:
        To represent the entire sentence, individual word embeddings might be combined. This can be done in various ways:
            Averaging: Simply averaging the vectors of all words in the sentence.
            TF-IDF Weighted Averaging: Weighting the embeddings of each word by their TF-IDF score before averaging.
        The resulting vector is a single embedding that represents the entire sentence. For example, the combined embedding for "I love this product" might be something like [0.4, 0.5, 0.6, 0.4, 0.3].

    - Dimensionality Reduction (Optional):
        In some cases, the embeddings might be further processed to reduce their dimensionality while retaining the essential features. Techniques like PCA (Principal Component Analysis) can be used for this.


## Storing LLM Embeddings

Storing embeddings from Large Language Models (LLMs) in a vector database can make sense in certain scenarios, but it's important to consider the specific use case, the nature of the embeddings, and the capabilities of both the LLM and the vector database. Here are some considerations and potential scenarios where this might be beneficial:
When It Makes Sense

    Semantic Search: If you're building a system for semantic search over a large corpus of text, storing LLM-generated embeddings in a vector database can enable efficient similarity searches. For instance, you could store embeddings of documents or paragraphs and then use query embeddings to find the most semantically relevant documents.

    Caching for Efficiency: LLMs can be computationally expensive to run, especially for large models. Pre-computing and storing embeddings for frequently accessed text can save computational resources and time.

    Large-Scale Analysis: For tasks like clustering, thematic analysis, or trend detection in large text datasets, storing embeddings can facilitate these analyses without the need to repeatedly process the text through the LLM.

    Hybrid Systems: In some AI applications, you might want to combine the deep understanding capabilities of LLMs with the efficient retrieval capabilities of vector databases. For example, in a recommendation system, LLM embeddings could capture nuanced content features, while the vector database manages retrieval and ranking.

Extracting the embedding could look something like the code below:

```python

from transformers import BertTokenizer, BertModel
import torch

# Load pre-trained model tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Encode text
input_text = "I love this product,"
encoded_input = tokenizer(input_text, return_tensors='pt')

# Get embeddings
with torch.no_grad():
    model_output = model(**encoded_input)

embeddings = model_output.last_hidden_state.mean(dim=1).squeeze().numpy()
print(embeddings)  # This is your text embedding
```  

compared to generating output text

```python

input_ids = tokenizer.encode(input_text, return_tensors='pt')

# Generate text
output = model.generate(input_ids, max_length=50, num_return_sequences=1)

# Decode and print the output text
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)

```
