# Pairwise Test Case Generator

A web-based tool for generating pairwise test cases to efficiently test combinations of input parameters.

## Live Demo

🚀 **Try it now:** https://ryiwamoto.github.io/pairwise_test_case_generator/

## Features

- **Interactive Web Interface**: Easy-to-use form for defining test factors and constraints
- **Real-time Generation**: Instantly generate pairwise test cases
- **Export Options**: Output results in multiple formats (table, JSON, markdown)
- **Constraint Support**: Define custom constraints to exclude invalid combinations
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## What is Pairwise Testing?

Pairwise testing is a combinatorial testing technique that tests all possible pairs of parameter values. It's based on the observation that most software failures are triggered by interactions between pairs of parameters, making it an efficient way to achieve good test coverage with fewer test cases.

## How to Use

1. **Define Factors**: Add your test parameters and their possible values
2. **Set Constraints**: Optionally define rules to exclude invalid combinations
3. **Generate**: Click to generate your pairwise test cases
4. **Export**: Choose your preferred output format

## Algorithm

The algorithm for generating test cases has referred to [this paper](https://github.com/Microsoft/pict/blob/master/doc/Pairwise%20Testing%20in%20Real%20World.pdf).