---
title: Fields in AI & Basics
---


## Machine Learning:

> Machine Learning as a Core: Machine learning is the core around which all these fields revolve. Whether it’s applying ML algorithms in data science, using them to train computer vision systems, or building predictive models in NLP, machine learning principles and techniques are fundamental.


### Supervised and Unsupervised Learning:

####   Supervised Learning: 

This involves training a model on a labeled dataset, where the correct answer (target) is known. The goal is to learn a mapping from inputs to outputs, to make predictions on new, unseen data. Common algorithms include:

- Linear Regression for continuous output prediction.
- Logistic Regression for binary classification.
- Decision Trees and Support Vector Machines (SVMs) for classification and regression tasks.

####   Unsupervised Learning: 
Here, the data has no labels, and the aim is to understand the structure or distribution in the data. It's about finding patterns or groupings from the data. Common algorithms include:

- K-Means Clustering for grouping data into clusters.
- Principal Component Analysis (PCA) for dimensionality reduction.
- Apriori algorithm for association rule learning.

### Model Evaluation and Tuning:

#### Model Evaluation: 
Involves assessing the performance of a machine learning model. Common metrics include accuracy, precision, recall, and F1 score for classification problems, and mean squared error (MSE) or mean absolute error (MAE) for regression.

#### Tuning: 
Refers to the process of adjusting the parameters of a machine learning model to improve its performance. This is often done using techniques like:

- Grid Search: Systematic testing of multiple combinations of parameter values.
- Cross-Validation: Partitioning the data into subsets, training on some subsets and validating on others, to ensure the model generalizes well to new data.

### Feature Engineering and Selection:

#### Feature Engineering: 

The process of using domain knowledge to create new input features from raw data that make machine learning algorithms work more effectively.

#### Feature Selection: 

Involves selecting the most significant features from the dataset. Techniques include:
       
- Filter Methods: Select features based on their statistical properties.
- Wrapper Methods: Use a subset of features and train a model to evaluate their performance.
- Embedded Methods: Algorithms that perform feature selection as part of the model training process, like LASSO regression.

### Ensemble Methods:

- Random Forests: An ensemble of Decision Trees, typically trained with the “bagging” method. It makes predictions by averaging the predictions of each component tree.
- Gradient Boosting: Builds an ensemble of trees one at a time, where each new tree helps to correct errors made by the previous ones. Uses a gradient descent algorithm to minimize the loss.
- Stacking: Involves training a new model to combine the predictions of several base models. It takes the outputs of the base models as input and aims to learn how to best combine these predictions to make a final prediction.

## Deep Learning:


> Deep Learning as a Common Ground: Deep learning serves as a foundation that significantly intersects with all the other fields. It provides the underlying techniques and architectures (like neural networks, CNNs, RNNs) that are crucial in advanced applications of computer vision, NLP, and many machine learning models.


- Neural Networks Basics: Understanding the architecture of neural networks, including layers, activation functions, and backpropagation.
- Optimization Algorithms: Familiarity with algorithms like Gradient Descent, Adam, etc.
- Regularization Techniques: Techniques like dropout, L1/L2 regularization to prevent overfitting.
- CNNs and RNNs: Deep dive into convolutional and recurrent neural networks for image and sequential data processing.
- Frameworks: Proficiency in deep learning frameworks like TensorFlow, PyTorch, or Keras.



## Computer Vision:

- Image Processing Basics: Understanding how to manipulate and process images, including operations like filtering, edge detection, and color space transformations.
- Feature Detection and Description: Learning algorithms for detecting and describing local features in images, like SIFT, SURF, and ORB.
- Object Detection and Recognition: Techniques to identify objects in images or video, such as using convolutional neural networks (CNNs).
- OpenCV: Familiarity with OpenCV, a key library for computer vision tasks.
- Deep Learning for Vision: Applying neural networks, especially CNNs, for tasks like image classification and facial recognition.

## Natural Language Processing (NLP):

- Text Processing and Regular Expressions: Basic skills in text manipulation and pattern recognition in text.
- Language Models: Understanding of NLP models like BERT, GPT, etc., which are essential for modern NLP tasks.
- Syntax and Semantics: Knowledge about sentence structure, meaning, and context in language.
- Machine Translation and Speech Recognition: Techniques for converting speech to text and translating between languages.
- Deep Learning for NLP: Applying recurrent neural networks (RNNs), Long Short-Term Memory networks (LSTMs), and Transformers in NLP tasks.


## Data Science:

- Statistics and Probability: Fundamental understanding of statistical measures, distributions, hypothesis testing, and Bayesian thinking.
- Data Wrangling and Exploration: Skills in data cleaning, manipulation, and exploration using tools like Pandas, SQL, etc.
- Data Visualization: Ability to visualize data for analysis using tools like Matplotlib, Seaborn, or Tableau.
- Machine Learning: Basic understanding of ML algorithms like linear regression, decision trees, clustering, etc.
- Big Data Technologies: Familiarity with big data platforms like Hadoop, Spark, and their ecosystems.

