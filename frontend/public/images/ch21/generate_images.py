#!/usr/bin/env python3
"""
Generate images for Chapter 21.3.1 - Non-linearity
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.patches import FancyBboxPatch

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'

# =====================================================
# Image 1: Linear Collapse Diagram
# =====================================================
def create_linear_collapse_diagram():
    """Show how multiple linear layers collapse into one"""
    fig, ax = plt.subplots(1, 1, figsize=(14, 6))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8)
    ax.axis('off')
    ax.set_title('Linear Collapse: Multiple Layers = One Layer', fontsize=16, fontweight='bold', pad=20)

    # Draw 3 linear layers
    layers_y = [6, 4, 2]

    # Layer 1
    for i in range(3):
        rect = FancyBboxPatch((1, layers_y[0]-0.4), 2, 0.8, boxstyle="round,pad=0.05",
                             facecolor='#3498db', edgecolor='black', linewidth=2)
        ax.add_patch(rect)
        ax.text(2, layers_y[0], f'Linear\nW₁', ha='center', va='center', fontsize=10, fontweight='bold', color='white')

    # Arrows between layers
    ax.annotate('', xy=(3.5, 6), xytext=(3, 6),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))

    # Layer 2
    for i in range(3):
        rect = FancyBboxPatch((4, layers_y[1]-0.4), 2, 0.8, boxstyle="round,pad=0.05",
                             facecolor='#3498db', edgecolor='black', linewidth=2)
        ax.add_patch(rect)
        ax.text(5, layers_y[1], f'Linear\nW₂', ha='center', va='center', fontsize=10, fontweight='bold', color='white')

    ax.annotate('', xy=(6.5, 4), xytext=(6, 4),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))

    # Layer 3
    for i in range(3):
        rect = FancyBboxPatch((7, layers_y[2]-0.4), 2, 0.8, boxstyle="round,pad=0.05",
                             facecolor='#3498db', edgecolor='black', linewidth=2)
        ax.add_patch(rect)
        ax.text(8, layers_y[2], f'Linear\nW₃', ha='center', va='center', fontsize=10, fontweight='bold', color='white')

    # Equals sign
    ax.text(10, 4, '=', fontsize=40, fontweight='bold', ha='center', va='center')

    # Single layer
    for i in range(3):
        rect = FancyBboxPatch((11, 4-0.4), 2, 0.8, boxstyle="round,pad=0.05",
                             facecolor='#e74c3c', edgecolor='black', linewidth=2)
        ax.add_patch(rect)
        ax.text(12, 4, f'W_gop\n(b₁W₂W₃+b₂W₃+b₃)', ha='center', va='center', fontsize=9, fontweight='bold', color='white')

    # Labels
    ax.text(5, 7.5, 'Nhiều Linear Layers', fontsize=14, fontweight='bold', ha='center')
    ax.text(12, 7.5, 'Tương đương\n1 Linear Layer!', fontsize=14, fontweight='bold', ha='center', color='#e74c3c')

    # Formula
    ax.text(7, 0.5, '(X · W₁) · W₂ = X · (W₁ · W₂) = X · W_gop',
            fontsize=12, ha='center', style='italic', color='#555')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/linear_collapse_diagram.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: linear_collapse_diagram.png")

# =====================================================
# Image 2: Linear vs Non-Linear Boundaries
# =====================================================
def create_linear_vs_nonlinear():
    """Compare linear and non-linear decision boundaries"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    # Data points for XOR
    x = np.array([0, 0, 1, 1])
    y = np.array([0, 1, 0, 1])
    labels = np.array([0, 1, 1, 0])

    # Left: Linear (impossible)
    ax1.scatter(x, y, c=labels, cmap='coolwarm', s=200, edgecolors='black', linewidths=2)
    ax1.plot([0, 1], [0, 1], 'g--', linewidth=2, label='Linear boundary (impossible)')
    ax1.set_xlim(-0.3, 1.3)
    ax1.set_ylim(-0.3, 1.3)
    ax1.set_xlabel('Input A', fontsize=12)
    ax1.set_ylabel('Input B', fontsize=12)
    ax1.set_title('Linear Boundary\n(KHÔNG THỂ tách XOR!)', fontsize=14, fontweight='bold', color='red')
    ax1.set_xticks([0, 1])
    ax1.set_yticks([0, 1])
    ax1.axhline(y=0.5, color='gray', linestyle='--', alpha=0.5)
    ax1.axvline(x=0.5, color='gray', linestyle='--', alpha=0.5)
    ax1.legend(loc='upper right')

    # Right: Non-Linear (works!)
    ax2.scatter(x, y, c=labels, cmap='coolwarm', s=200, edgecolors='black', linewidths=2)

    # Create curved boundary
    x_range = np.linspace(-0.3, 1.3, 100)
    y_range = np.linspace(-0.3, 1.3, 100)
    X, Y = np.meshgrid(x_range, y_range)
    Z = np.sin(np.pi * X) * np.sin(np.pi * Y)
    ax2.contour(X, Y, Z, levels=[0], colors='green', linewidths=2)

    ax2.set_xlim(-0.3, 1.3)
    ax2.set_ylim(-0.3, 1.3)
    ax2.set_xlabel('Input A', fontsize=12)
    ax2.set_ylabel('Input B', fontsize=12)
    ax2.set_title('Non-Linear Boundary\n(CÓ THỂ tách XOR!)', fontsize=14, fontweight='bold', color='green')
    ax2.set_xticks([0, 1])
    ax2.set_yticks([0, 1])
    ax2.axhline(y=0.5, color='gray', linestyle='--', alpha=0.5)
    ax2.axvline(x=0.5, color='gray', linestyle='--', alpha=0.5)

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/linear_vs_nonlinear_boundaries.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: linear_vs_nonlinear_boundaries.png")

# =====================================================
# Image 3: Activation Functions Comparison
# =====================================================
def create_activation_comparison():
    """Compare Sigmoid, Tanh, ReLU"""
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    x = np.linspace(-5, 5, 200)

    # Sigmoid
    y_sigmoid = 1 / (1 + np.exp(-x))
    axes[0].plot(x, y_sigmoid, 'b-', linewidth=3)
    axes[0].axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    axes[0].axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    axes[0].axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    axes[0].axhline(y=0, color='gray', linestyle='--', alpha=0.3)
    axes[0].set_title('Sigmoid\n$\\sigma(x) = \\frac{1}{1+e^{-x}}$', fontsize=14, fontweight='bold')
    axes[0].set_xlabel('x')
    axes[0].set_ylabel('f(x)')
    axes[0].set_ylim(-0.5, 1.5)
    axes[0].grid(True, alpha=0.3)

    # Tanh
    y_tanh = np.tanh(x)
    axes[1].plot(x, y_tanh, 'purple', linewidth=3)
    axes[1].axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    axes[1].axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    axes[1].axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    axes[1].axhline(y=-1, color='gray', linestyle='--', alpha=0.3)
    axes[1].set_title('Tanh\n$\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$', fontsize=14, fontweight='bold')
    axes[1].set_xlabel('x')
    axes[1].set_ylabel('f(x)')
    axes[1].set_ylim(-1.5, 1.5)
    axes[1].grid(True, alpha=0.3)

    # ReLU
    y_relu = np.maximum(0, x)
    axes[2].plot(x, y_relu, 'green', linewidth=3)
    axes[2].axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    axes[2].axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    axes[2].set_title('ReLU\n$f(x) = \\max(0, x)$', fontsize=14, fontweight='bold')
    axes[2].set_xlabel('x')
    axes[2].set_ylabel('f(x)')
    axes[2].set_ylim(-0.5, 5)
    axes[2].grid(True, alpha=0.3)

    # Highlight the "bent" point for ReLU
    axes[2].plot(0, 0, 'ro', markersize=10)

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/activation_functions_comparison.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: activation_functions_comparison.png")

# =====================================================
# Image 4: XOR Problem Visualization
# =====================================================
def create_xor_problem():
    """Visualize XOR problem"""
    fig, ax = plt.subplots(1, 1, figsize=(8, 8))

    # XOR data points
    points = [(0, 0, 'Class 0', '#3498db'), (0, 1, 'Class 1', '#e74c3c'),
              (1, 0, 'Class 1', '#e74c3c'), (1, 1, 'Class 0', '#3498db')]

    for x, y, label, color in points:
        ax.scatter(x, y, c=color, s=400, edgecolors='black', linewidths=2, zorder=5)
        ax.annotate(label, (x, y), textcoords="offset points", xytext=(15, 5), fontsize=14, fontweight='bold')

    # Try to draw a linear boundary (impossible!)
    ax.plot([-0.3, 1.3], [1.3, -0.3], 'g--', linewidth=2, label='Linear boundary (FAILED)')
    ax.plot([-0.3, 1.3], [-0.3, 1.3], 'r--', linewidth=2, label='Another linear (also FAILED)')

    ax.set_xlim(-0.5, 1.5)
    ax.set_ylim(-0.5, 1.5)
    ax.set_xlabel('Input A', fontsize=14)
    ax.set_ylabel('Input B', fontsize=14)
    ax.set_title('XOR Problem\nKhông thể tách bằng đường thẳng!', fontsize=16, fontweight='bold')
    ax.set_xticks([0, 1])
    ax.set_yticks([0, 1])
    ax.legend(loc='upper left')
    ax.grid(True, alpha=0.3)

    # Add text annotation
    ax.text(0.5, -0.3, 'Cần đường CONG để tách!', fontsize=14, ha='center',
            fontweight='bold', color='green', style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/xor_problem.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: xor_problem.png")

# =====================================================
# Image 5: Neural Network with Activation (Simplified)
# =====================================================
def create_nn_with_activation():
    """Simple NN architecture diagram"""
    fig, ax = plt.subplots(1, 1, figsize=(14, 8))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8)
    ax.axis('off')
    ax.set_title('Neural Network với Activation Functions', fontsize=16, fontweight='bold', pad=20)

    # Define layers
    layers = [2, 4, 3, 1]  # neurons per layer
    layer_names = ['Input\n(2)', 'Hidden 1\n(4)', 'Hidden 2\n(3)', 'Output\n(1)']
    x_positions = [2, 5, 8, 11]

    # Draw neurons and connections
    for layer_idx, (n_neurons, x_pos, name) in enumerate(zip(layers, x_positions, layer_names)):
        y_positions = np.linspace(1, 7, n_neurons)

        # Draw neurons
        for y in y_positions:
            color = '#3498db' if layer_idx < len(layers) - 1 else '#e74c3c'
            circle = plt.Circle((x_pos, y), 0.35, color=color, ec='black', linewidth=2)
            ax.add_patch(circle)

        # Label layer
        ax.text(x_pos, 7.8, name, ha='center', va='bottom', fontsize=10, fontweight='bold')

        # Draw connections to next layer (if not last layer)
        if layer_idx < len(layers) - 1:
            next_y_positions = np.linspace(1, 7, layers[layer_idx + 1])
            for y1 in y_positions:
                for y2 in next_y_positions:
                    ax.plot([x_pos + 0.35, x_pos + 0.65], [y1, y2],
                           'gray', alpha=0.3, linewidth=0.5)

    # Add activation labels
    ax.text(3.5, 4, 'f()\nReLU', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round', facecolor='#2ecc71', alpha=0.8), color='white')
    ax.text(6.5, 4, 'f()\nReLU', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round', facecolor='#2ecc71', alpha=0.8), color='white')
    ax.text(9.5, 4, 'f()\nSigmoid', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round', facecolor='#9b59b6', alpha=0.8), color='white')

    # Arrow showing data flow
    ax.annotate('', xy=(13.5, 4), xytext=(12, 4),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/neural_network_with_activation.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: neural_network_with_activation.png")

# =====================================================
# NEW IMAGE 6: Sigmoid Function Detail
# =====================================================
def create_sigmoid_detail():
    """Detailed Sigmoid function with derivative"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    x = np.linspace(-6, 6, 200)
    y_sigmoid = 1 / (1 + np.exp(-x))
    y_sigmoid_deriv = y_sigmoid * (1 - y_sigmoid)

    # Left: Sigmoid function
    ax1.plot(x, y_sigmoid, 'b-', linewidth=3, label='Sigmoid(x)')
    ax1.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax1.axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    ax1.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax1.fill_between(x, 0, y_sigmoid, alpha=0.2, color='blue')
    ax1.set_title('Sigmoid: (x) = 1/(1+e^-x)', fontsize=14, fontweight='bold')
    ax1.set_xlabel('x')
    ax1.set_ylabel('Sigmoid(x)')
    ax1.set_ylim(-0.2, 1.2)
    ax1.grid(True, alpha=0.3)
    ax1.legend()

    # Annotations
    ax1.annotate('Output: (0, 1)', xy=(0, 0.5), xytext=(3, 0.7),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')

    # Right: Derivative
    ax2.plot(x, y_sigmoid_deriv, 'r-', linewidth=3, label="Sigmoid'(x)")
    ax2.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax2.axhline(y=0.25, color='gray', linestyle='--', alpha=0.3)
    ax2.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax2.fill_between(x, 0, y_sigmoid_deriv, alpha=0.2, color='red')
    ax2.set_title("Sigmoid Derivative: (x) = (x)(1-(x))", fontsize=14, fontweight='bold')
    ax2.set_xlabel('x')
    ax2.set_ylabel("Derivative")
    ax2.set_ylim(-0.1, 0.3)
    ax2.grid(True, alpha=0.3)
    ax2.legend()

    # Annotations
    ax2.annotate('Max = 0.25 at x=0', xy=(0, 0.25), xytext=(2, 0.2),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/act_sigmoid.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: act_sigmoid.png")

# =====================================================
# NEW IMAGE 7: Tanh Function Detail
# =====================================================
def create_tanh_detail():
    """Detailed Tanh function with derivative"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    x = np.linspace(-6, 6, 200)
    y_tanh = np.tanh(x)
    y_tanh_deriv = 1 - y_tanh ** 2

    # Left: Tanh function
    ax1.plot(x, y_tanh, 'purple', linewidth=3, label='tanh(x)')
    ax1.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax1.axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    ax1.axhline(y=-1, color='gray', linestyle='--', alpha=0.3)
    ax1.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax1.fill_between(x, 0, y_tanh, alpha=0.2, color='purple')
    ax1.set_title('Tanh: tanh(x) = (e^x - e^-x)/(e^x + e^-x)', fontsize=14, fontweight='bold')
    ax1.set_xlabel('x')
    ax1.set_ylabel('tanh(x)')
    ax1.set_ylim(-1.3, 1.3)
    ax1.grid(True, alpha=0.3)
    ax1.legend()

    # Annotations
    ax1.annotate('Zero-centered', xy=(0, 0), xytext=(3, 0.5),
                arrowprops=dict(arrowstyle='->', color='green'),
                fontsize=10, color='green')

    # Right: Derivative
    ax2.plot(x, y_tanh_deriv, 'orange', linewidth=3, label="tanh'(x)")
    ax2.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax2.axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    ax2.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax2.fill_between(x, 0, y_tanh_deriv, alpha=0.2, color='orange')
    ax2.set_title("Tanh Derivative: tanh'(x) = 1 - tanh^2(x)", fontsize=14, fontweight='bold')
    ax2.set_xlabel('x')
    ax2.set_ylabel("tanh'(x)")
    ax2.set_ylim(-0.1, 1.2)
    ax2.grid(True, alpha=0.3)
    ax2.legend()

    # Annotations
    ax2.annotate('Max = 1.0 at x=0', xy=(0, 1), xytext=(2, 0.8),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/act_tanh.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: act_tanh.png")

# =====================================================
# NEW IMAGE 8: ReLU Function Detail
# =====================================================
def create_relu_detail():
    """Detailed ReLU function with derivative"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    x = np.linspace(-4, 4, 200)
    y_relu = np.maximum(0, x)
    y_relu_deriv = (x > 0).astype(float)

    # Left: ReLU function
    ax1.plot(x, y_relu, 'green', linewidth=3, label='f(x) = max(0, x)')
    ax1.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax1.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax1.fill_between(x, 0, y_relu, alpha=0.2, color='green')
    ax1.set_title('ReLU: f(x) = max(0, x)', fontsize=14, fontweight='bold')
    ax1.set_xlabel('x')
    ax1.set_ylabel('f(x)')
    ax1.set_ylim(-0.5, 4.5)
    ax1.grid(True, alpha=0.3)
    ax1.legend()

    # Highlight the bend point
    ax1.plot(0, 0, 'ro', markersize=10)

    # Right: Derivative
    ax2.plot(x, y_relu_deriv, 'red', linewidth=3, label="f'(x)")
    ax2.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax2.axhline(y=1, color='gray', linestyle='--', alpha=0.3)
    ax2.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax2.fill_between(x, 0, y_relu_deriv, alpha=0.2, color='red')
    ax2.set_title("ReLU Derivative: f'(x) = 1 if x > 0, else 0", fontsize=14, fontweight='bold')
    ax2.set_xlabel('x')
    ax2.set_ylabel("f'(x)")
    ax2.set_ylim(-0.2, 1.3)
    ax2.grid(True, alpha=0.3)
    ax2.legend()

    # Annotations
    ax2.annotate('Gradient = 1 for x > 0', xy=(2, 1), xytext=(0.5, 1.1),
                arrowprops=dict(arrowstyle='->', color='green'),
                fontsize=10, color='green')
    ax2.annotate('Gradient = 0 for x < 0\n(Dead ReLU!)', xy=(-2, 0), xytext=(-3, 0.5),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/act_relu.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: act_relu.png")

# =====================================================
# NEW IMAGE 9: Dying ReLU Visualization
# =====================================================
def create_dying_relu():
    """Visualize the Dying ReLU problem"""
    fig, ax = plt.subplots(1, 1, figsize=(12, 6))

    # Create visualization showing neurons dying
    x = np.linspace(-3, 3, 100)

    # Multiple ReLU outputs with different weights
    weights = [2.0, 1.0, 0.5, 0.0, -0.5, -1.0]
    colors = ['green', 'lightgreen', 'yellow', 'orange', 'salmon', 'red']

    for w, c in zip(weights, colors):
        y = np.maximum(0, x * w)
        ax.plot(x, y, color=c, linewidth=2, label=f'W={w}', alpha=0.7)

    ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax.set_title('The Dying ReLU Problem\nWhen W < 0, neuron always outputs 0 and gradient = 0!', fontsize=14, fontweight='bold')
    ax.set_xlabel('Input x')
    ax.set_ylabel('Output f(x)')
    ax.set_ylim(-0.5, 7)
    ax.grid(True, alpha=0.3)
    ax.legend(loc='upper left', ncol=2)

    # Add text annotations
    ax.text(2, 5, 'Neuron ALIVE\n(learning)', fontsize=11, ha='center',
            bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.8))
    ax.text(-2, 1, 'Neuron DEAD\n(no learning!)', fontsize=11, ha='center',
            bbox=dict(boxstyle='round', facecolor='lightcoral', alpha=0.8))

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/dying_relu.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: dying_relu.png")

# =====================================================
# NEW IMAGE 10: ReLU Variants Comparison
# =====================================================
def create_relu_variants():
    """Compare ReLU variants"""
    fig, ax = plt.subplots(1, 1, figsize=(12, 7))

    x = np.linspace(-4, 4, 200)

    # ReLU
    y_relu = np.maximum(0, x)
    ax.plot(x, y_relu, 'g-', linewidth=3, label='ReLU: max(0, x)')

    # Leaky ReLU
    y_leaky = np.maximum(0.01 * x, x)
    ax.plot(x, y_leaky, 'b--', linewidth=2, label='Leaky ReLU: max(0.01x, x)')

    # ELU
    alpha = 1.0
    y_elu = np.where(x > 0, x, alpha * (np.exp(x) - 1))
    ax.plot(x, y_elu, 'r-.', linewidth=2, label='ELU: x>0 ? x : (e^x-1)')

    ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax.set_title('ReLU Variants Comparison', fontsize=16, fontweight='bold')
    ax.set_xlabel('x')
    ax.set_ylabel('f(x)')
    ax.set_ylim(-4, 4)
    ax.grid(True, alpha=0.3)
    ax.legend(loc='upper left')

    # Annotations
    ax.annotate('Leaky ReLU:\nsmall gradient\nfor negative x', xy=(-2, -0.02), xytext=(-3, -1.5),
                arrowprops=dict(arrowstyle='->', color='blue'),
                fontsize=10, color='blue')

    ax.annotate('ELU:\nsmooth curve\nto negative', xy=(-2, -0.6), xytext=(-1, -2.5),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/relu_variants.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: relu_variants.png")

# =====================================================
# NEW IMAGE 11: GELU Function
# =====================================================
def create_gelu_detail():
    """Detailed GELU function"""
    fig, ax = plt.subplots(1, 1, figsize=(10, 6))

    x = np.linspace(-4, 4, 200)

    # GELU approximation
    sqrt_2_over_pi = np.sqrt(2 / np.pi)
    coeff = 0.044715
    gelu = 0.5 * x * (1 + np.tanh(sqrt_2_over_pi * (x + coeff * x**3)))

    # ReLU for comparison
    relu = np.maximum(0, x)

    ax.plot(x, gelu, 'purple', linewidth=3, label='GELU')
    ax.plot(x, relu, 'g--', linewidth=2, label='ReLU (for comparison)')
    ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax.fill_between(x, 0, gelu, alpha=0.2, color='purple')
    ax.set_title('GELU: Gaussian Error Linear Unit\nUsed in BERT, GPT, Transformers!', fontsize=14, fontweight='bold')
    ax.set_xlabel('x')
    ax.set_ylabel('GELU(x)')
    ax.set_ylim(-0.5, 4)
    ax.grid(True, alpha=0.3)
    ax.legend()

    # Annotations
    ax.annotate('Smooth transition\nfor negative values', xy=(-1, -0.2), xytext=(-2.5, -0.4),
                arrowprops=dict(arrowstyle='->', color='purple'),
                fontsize=10, color='purple')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/act_gelu.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: act_gelu.png")

# =====================================================
# NEW IMAGE 12: Swish/SiLU Function
# =====================================================
def create_swish_detail():
    """Detailed Swish/SiLU function"""
    fig, ax = plt.subplots(1, 1, figsize=(10, 6))

    x = np.linspace(-4, 4, 200)

    # Swish/SiLU
    swish = x / (1 + np.exp(-x))

    # ReLU for comparison
    relu = np.maximum(0, x)

    # Sigmoid component
    sigmoid = 1 / (1 + np.exp(-x))

    ax.plot(x, swish, 'pink', linewidth=3, label='Swish/SiLU: x * (x)')
    ax.plot(x, relu, 'g--', linewidth=2, label='ReLU')
    ax.plot(x, sigmoid, 'b:', linewidth=1.5, label='Sigmoid(x)')
    ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax.fill_between(x, 0, swish, alpha=0.2, color='pink')
    ax.set_title('Swish/SiLU: Self-Gated Activation\nUsed in Swin Transformer, EfficientNet!', fontsize=14, fontweight='bold')
    ax.set_xlabel('x')
    ax.set_ylabel('Swish(x)')
    ax.set_ylim(-0.5, 4)
    ax.grid(True, alpha=0.3)
    ax.legend()

    # Annotations
    ax.annotate('Bell-shaped curve\n(non-monotonic!)', xy=(1.5, 1.5), xytext=(2, 2.5),
                arrowprops=dict(arrowstyle='->', color='pink'),
                fontsize=10, color='pink')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch21/act_swish.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: act_swish.png")

# Run all
if __name__ == '__main__':
    import os
    os.makedirs('/home/quan/Desktop/KaiRust/frontend/public/images/ch21', exist_ok=True)

    # Existing images
    create_linear_collapse_diagram()
    create_linear_vs_nonlinear()
    create_activation_comparison()
    create_xor_problem()
    create_nn_with_activation()

    # New images for sections 2, 3, 4
    create_sigmoid_detail()
    create_tanh_detail()
    create_relu_detail()
    create_dying_relu()
    create_relu_variants()
    create_gelu_detail()
    create_swish_detail()

    print("\n✅ All images created successfully!")
