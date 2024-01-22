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


### Neural Networks Basics:
- **Architecture**: Neural networks consist of layers of interconnected nodes or neurons. Each layer receives input from previous layers (except the first layer, which takes in the raw data) and provides output to subsequent layers. The most common layers are input, hidden, and output layers.
- **Activation Functions**: These are functions applied to the output of a neuron, introducing non-linear properties to the model. Common examples include ReLU (Rectified Linear Unit), Sigmoid, and Tanh.
- **Backpropagation**: This is the process of adjusting the weights of the neural network based on the error rate (loss) obtained in the previous epoch (iteration). It involves calculating the gradient of the loss function with respect to each weight by the chain rule.

### Optimization Algorithms:
- **Gradient Descent**: This is a fundamental algorithm that minimizes the loss function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient.
- **Adam (Adaptive Moment Estimation)**: A popular optimization algorithm, Adam combines the best properties of the AdaGrad and RMSProp algorithms to provide an optimization algorithm that can handle sparse gradients on noisy problems.

### Regularization Techniques:
- **Dropout**: A technique where randomly selected neurons are ignored during training, which means their contribution to the activation of downstream neurons is temporally removed on the forward pass and any weight updates are not applied on the backward pass.
- **L1/L2 Regularization**: These add a penalty term to the loss function. L1 regularization (also known as Lasso regression) adds the absolute value of the weights, while L2 regularization (also known as Ridge regression) adds the squared value of the weights, to the loss function.

### CNNs and RNNs:
- **Convolutional Neural Networks (CNNs)**: Primarily used in image processing, these networks employ a mathematical operation called convolution. CNNs are characterized by their convolutional layers that apply a number of filters to the input.
- **Recurrent Neural Networks (RNNs)**: Ideal for processing sequential data (like time series or natural language), RNNs have connections that form cycles in the network, allowing information to persist over time.

### Frameworks:
- **TensorFlow**: An open-source software library for dataflow and differentiable programming, widely used for machine learning applications such as neural networks.
- **PyTorch**: Known for its simplicity and ease of use, especially for prototypes and experiments, PyTorch is an open-source machine learning library based on Torch.
- **Keras**: An open-source software library that provides a Python interface for artificial neural networks. Keras acts as an interface for the TensorFlow library.

## Data Science:

### Statistics and Probability:
- **Fundamental Understanding**: A solid grasp of statistical measures, distributions, hypothesis testing, and Bayesian thinking is essential. This includes:
    - Understanding different types of data and how to summarize them using statistical measures like mean, median, mode, variance, etc.
    - Knowledge of probability distributions (normal, binomial, Poisson, etc.) and how they are used to model real-world phenomena.
    - Skills in hypothesis testing to make inferences or decisions based on data analysis.
    - Familiarity with Bayesian methods for statistical analysis, which involve using probabilities for both hypotheses and data.

### Data Wrangling and Exploration:
- **Skills Required**: Proficiency in data cleaning, manipulation, and exploration is crucial. Key competencies include:
    - Ability to clean and preprocess data to make it suitable for analysis (handling missing values, outliers, etc.).
    - Expertise in manipulating datasets using tools like Pandas (for Python) or data.table (for R).
    - Skills in using SQL for data querying and handling.
    - Competence in exploratory data analysis to uncover initial patterns, characteristics, and points of interest in the data.

### Data Visualization:
- **Ability to Visualize Data**: Effective data visualization is key for analysis. This involves:
    - Utilizing tools like Matplotlib and Seaborn (in Python) or ggplot2 (in R) for creating a wide range of static, interactive, and complex plots.
    - Employing Tableau for more advanced business intelligence visualizations and dashboards.
    - Understanding the principles of good visualization, including choice of appropriate chart types, color schemes, and annotations to make data insights clear and intuitive.

### (Big Data Technologies):
- **Familiarity with Big Data Platforms**: While core concept but not necessarily basic knowledge it becomes increasinngly impoortant:
    - Understanding Hadoop and its ecosystem, including HDFS for storage and MapReduce for processing.
    - Familiarity with Apache Spark, a powerful platform for big data processing and analytics.
    - Knowledge of how these technologies are used for handling and analyzing large datasets, real-time data processing, and scalable machine learning.


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

