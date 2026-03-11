#!/usr/bin/env python3
"""
Generate images for Chapter 21.4 - Loss Functions
Script tạo các hình ảnh minh họa cho phần Loss Functions:
1. MLE (Maximum Likelihood Estimation) visualization
2. Underflow problem when multiplying small probabilities
3. NLL (Negative Log-Likelihood) transformation
4. Regression Loss curves (MSE, MAE, Huber)
5. Classification Loss curves (BCE, Cross-Entropy)
6. Gradient Descent visualization on loss surface
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.patches import FancyBboxPatch, Circle, FancyArrowPatch
from matplotlib.gridspec import GridSpec

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 11

# Output directory
OUTPUT_DIR = '/home/quan/Desktop/KaiRust/frontend/public/images/ch21'

# =====================================================
# Image 1: MLE Concept Visualization
# =====================================================
def create_mle_concept():
    """Minh họa khái niệm Maximum Likelihood Estimation"""
    fig, axes = plt.subplots(1, 3, figsize=(16, 5))

    # Sample data: 5 coin flips, 4 heads (H), 1 tail (T)
    data = ['H', 'H', 'H', 'H', 'T']

    # Left: Different probability distributions
    ax1 = axes[0]
    p_values = np.linspace(0, 1, 100)
    likelihoods = p_values**4 * (1 - p_values)**1

    ax1.plot(p_values, likelihoods, 'b-', linewidth=2)
    ax1.axvline(x=0.8, color='red', linestyle='--', linewidth=2, label=f'MLE: p=0.8')
    ax1.fill_between(p_values, likelihoods, alpha=0.3)

    ax1.set_xlabel('Probability of Heads (p)', fontsize=12)
    ax1.set_ylabel('Likelihood L(p|data)', fontsize=12)
    ax1.set_title('Maximum Likelihood Estimation\nFinding p that maximizes L(p|data)', fontsize=13, fontweight='bold')
    ax1.legend()
    ax1.set_xlim(0, 1)

    # Middle: Log-Likelihood
    ax2 = axes[1]
    log_likelihoods = 4 * np.log(p_values + 1e-10) + 1 * np.log(1 - p_values + 1e-10)

    ax2.plot(p_values, log_likelihoods, 'g-', linewidth=2)
    ax2.axvline(x=0.8, color='red', linestyle='--', linewidth=2, label=f'MLE: p=0.8')
    ax2.fill_between(p_values, log_likelihoods, alpha=0.3, color='green')

    ax2.set_xlabel('Probability of Heads (p)', fontsize=12)
    ax2.set_ylabel('Log-Likelihood log L(p|data)', fontsize=12)
    ax2.set_title('Log-Likelihood\nAvoids underflow, same maximum!', fontsize=13, fontweight='bold')
    ax2.legend()
    ax2.set_xlim(0, 1)

    # Right: Negative Log-Likelihood (Loss!)
    ax3 = axes[2]
    nll = -log_likelihoods

    ax3.plot(p_values, nll, 'r-', linewidth=2)
    ax3.axvline(x=0.8, color='blue', linestyle='--', linewidth=2, label=f'Minimum at p=0.8')
    ax3.fill_between(p_values, nll, alpha=0.3, color='red')

    ax3.set_xlabel('Probability of Heads (p)', fontsize=12)
    ax3.set_ylabel('Negative Log-Likelihood Loss', fontsize=12)
    ax3.set_title('NLL Loss\nMinimizing Loss = Maximizing Likelihood!', fontsize=13, fontweight='bold')
    ax3.legend()
    ax3.set_xlim(0, 1)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_mle_concept.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_mle_concept.png")


# =====================================================
# Image 2: Underflow Problem
# =====================================================
def create_underflow_problem():
    """Minh họa vấn đề underflow khi nhân nhiều xác suất nhỏ"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    # Left: Probability multiplication causing underflow
    n_samples = np.arange(1, 101)
    probs = [0.5, 0.3, 0.1]

    ax1.set_title('Underflow Problem\nMultiplying Small Probabilities', fontsize=14, fontweight='bold')
    ax1.set_xlabel('Number of Samples', fontsize=12)
    ax1.set_ylabel('Likelihood (Product of Probabilities)', fontsize=12)
    ax1.set_yscale('log')
    ax1.grid(True, alpha=0.3)

    for p in probs:
        likelihoods = p ** n_samples
        ax1.plot(n_samples, likelihoods, linewidth=2, label=f'p = {p}')

    ax1.axhline(y=1e-300, color='red', linestyle='--', linewidth=2, label='Double precision limit (~1e-308)')
    ax1.legend()
    ax1.set_xlim(1, 100)

    # Right: How log solves it
    ax2.set_title('Log Transformation Saves Us!\nAddition instead of multiplication', fontsize=14, fontweight='bold')
    ax2.set_xlabel('Number of Samples', fontsize=12)
    ax2.set_ylabel('Log-Likelihood', fontsize=12)
    ax2.grid(True, alpha=0.3)

    for p in probs:
        log_likelihoods = n_samples * np.log(p)
        ax2.plot(n_samples, log_likelihoods, linewidth=2, label=f'log(p) = {np.log(p):.2f}')

    ax2.legend()
    ax2.set_xlim(1, 100)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_underflow.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_underflow.png")


# =====================================================
# Image 3: MLE vs NLL - Deep Dive
# =====================================================
def create_mle_vs_nll():
    """So sánh chi tiết MLE và NLL"""
    fig = plt.figure(figsize=(16, 10))
    gs = GridSpec(2, 3, figure=fig, hspace=0.3, wspace=0.3)

    # Row 1: Conceptual explanation
    ax1 = fig.add_subplot(gs[0, 0])
    ax1.axis('off')
    ax1.set_title('MLE = Maximum Likelihood Estimation', fontsize=12, fontweight='bold')

    # Draw probability distribution
    x = np.linspace(0, 10, 100)
    y = 1/(np.sqrt(2*np.pi)) * np.exp(-0.5*(x-5)**2)
    ax1.plot(x, y, 'b-', linewidth=2)
    ax1.fill_between(x, y, alpha=0.3)
    ax1.set_title('Probability Distribution P(data|θ)', fontsize=11, fontweight='bold')
    ax1.set_xlabel('θ (model parameters)')
    ax1.set_ylabel('P(data|θ)')

    ax2 = fig.add_subplot(gs[0, 1])
    ax2.axis('off')
    ax2.set_title('Log-Likelihood', fontsize=12, fontweight='bold')

    log_y = np.log(y + 1e-10)
    ax2.plot(x, log_y, 'g-', linewidth=2)
    ax2.fill_between(x, log_y, alpha=0.3, color='green')
    ax2.set_title('log P(data|θ)', fontsize=11, fontweight='bold')
    ax2.set_xlabel('θ (model parameters)')
    ax2.set_ylabel('log P(data|θ)')

    ax3 = fig.add_subplot(gs[0, 2])
    ax3.axis('off')
    ax3.set_title('Negative Log-Likelihood (Loss!)', fontsize=12, fontweight='bold')

    nll_y = -log_y
    ax3.plot(x, nll_y, 'r-', linewidth=2)
    ax3.fill_between(x, nll_y, alpha=0.3, color='red')
    ax3.set_title('-log P(data|θ) = LOSS', fontsize=11, fontweight='bold')
    ax3.set_xlabel('θ (model parameters)')
    ax3.set_ylabel('NLL Loss')

    # Row 2: Example with actual values
    ax4 = fig.add_subplot(gs[1, 0])

    # Coin flip example
    heads = 7
    flips = 10
    p_range = np.linspace(0.01, 0.99, 100)

    # Calculate likelihoods
    from scipy.special import comb
    likelihoods = [comb(flips, heads) * (p**heads) * ((1-p)**(flips-heads)) for p in p_range]
    log_likelihoods = [heads * np.log(p) + (flips-heads) * np.log(1-p) for p in p_range]
    nll_losses = [-ll for ll in log_likelihoods]

    ax4.plot(p_range, likelihoods, 'b-', linewidth=2)
    ax4.axvline(x=0.7, color='red', linestyle='--', label='MLE: p=0.7')
    ax4.set_xlabel('Probability p')
    ax4.set_ylabel('Likelihood')
    ax4.set_title('Likelihood: 7 heads in 10 flips', fontsize=11, fontweight='bold')
    ax4.legend()
    ax4.grid(True, alpha=0.3)

    ax5 = fig.add_subplot(gs[1, 1])
    ax5.plot(p_range, log_likelihoods, 'g-', linewidth=2)
    ax5.axvline(x=0.7, color='red', linestyle='--', label='MLE: p=0.7')
    ax5.set_xlabel('Probability p')
    ax5.set_ylabel('Log-Likelihood')
    ax5.set_title('Log-Likelihood (No underflow!)', fontsize=11, fontweight='bold')
    ax5.legend()
    ax5.grid(True, alpha=0.3)

    ax6 = fig.add_subplot(gs[1, 2])
    ax6.plot(p_range, nll_losses, 'r-', linewidth=2)
    ax6.axvline(x=0.7, color='blue', linestyle='--', label='Min Loss: p=0.7')
    ax6.set_xlabel('Probability p')
    ax6.set_ylabel('NLL Loss')
    ax6.set_title('Ready forNLL Loss ( Gradient Descent!)', fontsize=11, fontweight='bold')
    ax6.legend()
    ax6.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_mle_vs_nll.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_mle_vs_nll.png")


# =====================================================
# Image 4: Regression Loss Functions Comparison
# =====================================================
def create_regression_losses():
    """So sánh các hàm Loss cho Regression: MSE, MAE, Huber"""
    fig, axes = plt.subplots(1, 3, figsize=(16, 5))

    # Error range
    errors = np.linspace(-5, 5, 200)

    # MSE (L2) Loss
    mse = errors ** 2
    ax1 = axes[0]
    ax1.plot(errors, mse, 'b-', linewidth=3)
    ax1.fill_between(errors, mse, alpha=0.3, color='blue')
    ax1.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax1.set_ylabel('Loss', fontsize=12)
    ax1.set_title('MSE (Mean Squared Error)\nL = (y - ŷ)²', fontsize=14, fontweight='bold')
    ax1.grid(True, alpha=0.3)

    # Annotations
    ax1.annotate('Quadratic growth\nHeavy penalty for outliers!', xy=(4, 16), xytext=(2, 10),
                arrowprops=dict(arrowstyle='->', color='red'), fontsize=10, color='red')

    # MAE (L1) Loss
    mae = np.abs(errors)
    ax2 = axes[1]
    ax2.plot(errors, mae, 'g-', linewidth=3)
    ax2.fill_between(errors, mae, alpha=0.3, color='green')
    ax2.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax2.set_ylabel('Loss', fontsize=12)
    ax2.set_title('MAE (Mean Absolute Error)\nL = |y - ŷ|', fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3)

    # Annotations
    ax2.annotate('Linear growth\nRobust to outliers!', xy=(4, 4), xytext=(2, 3),
                arrowprops=dict(arrowstyle='->', color='green'), fontsize=10, color='green')
    ax2.annotate('Non-differentiable\nat error=0!', xy=(0, 0), xytext=(1.5, 1),
                arrowprops=dict(arrowstyle='->', color='orange'), fontsize=10, color='orange')

    # Huber Loss
    delta = 1.0
    huber = np.where(np.abs(errors) <= delta,
                     0.5 * errors**2,
                     delta * np.abs(errors) - 0.5 * delta**2)
    ax3 = axes[2]
    ax3.plot(errors, mse, 'b--', linewidth=1, alpha=0.5, label='MSE')
    ax3.plot(errors, mae, 'g--', linewidth=1, alpha=0.5, label='MAE')
    ax3.plot(errors, huber, 'r-', linewidth=3, label='Huber')
    ax3.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax3.set_ylabel('Loss', fontsize=12)
    ax3.set_title(f'Huber Loss (δ={delta})\nMSE for small, MAE for large errors', fontsize=14, fontweight='bold')
    ax3.grid(True, alpha=0.3)
    ax3.legend()

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_regression_comparison.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_regression_comparison.png")


# =====================================================
# Image 5: Regression Loss Derivatives
# =====================================================
def create_regression_derivatives():
    """Đạo hàm của các hàm Loss Regression"""
    fig, axes = plt.subplots(1, 3, figsize=(16, 5))

    errors = np.linspace(-5, 5, 200)

    # MSE Derivative
    mse_deriv = 2 * errors
    ax1 = axes[0]
    ax1.plot(errors, mse_deriv, 'b-', linewidth=3)
    ax1.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax1.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax1.fill_between(errors, mse_deriv, alpha=0.3, color='blue')
    ax1.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax1.set_ylabel('∂L/∂ŷ', fontsize=12)
    ax1.set_title("MSE Derivative: ∂L/∂ŷ = 2(y - ŷ)", fontsize=14, fontweight='bold')
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim(-10, 10)

    # MAE Derivative
    mae_deriv = np.sign(errors)
    ax2 = axes[1]
    ax2.plot(errors, mae_deriv, 'g-', linewidth=3)
    ax2.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax2.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax2.scatter([0], [0], color='orange', s=100, zorder=5, marker='o', label='Undefined!')
    ax2.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax2.set_ylabel('∂L/∂ŷ', fontsize=12)
    ax2.set_title("MAE Derivative: ∂L/∂ŷ = sign(y - ŷ)", fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3)
    ax2.set_ylim(-2, 2)
    ax2.legend()

    # Huber Derivative
    delta = 1.0
    huber_deriv = np.where(np.abs(errors) <= delta, errors, delta * np.sign(errors))
    ax3 = axes[2]
    ax3.plot(errors, mse_deriv, 'b--', linewidth=1, alpha=0.5, label='MSE deriv')
    ax3.plot(errors, huber_deriv, 'r-', linewidth=3, label='Huber deriv')
    ax3.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax3.axvline(x=0, color='gray', linestyle='--', alpha=0.5)
    ax3.axvline(x=delta, color='purple', linestyle=':', alpha=0.7)
    ax3.axvline(x=-delta, color='purple', linestyle=':', alpha=0.7)
    ax3.set_xlabel('Error (y - ŷ)', fontsize=12)
    ax3.set_ylabel('∂L/∂ŷ', fontsize=12)
    ax3.set_title(f"Huber Derivative: Linear→{delta}, Constant after!", fontsize=14, fontweight='bold')
    ax3.grid(True, alpha=0.3)
    ax3.legend()
    ax3.set_ylim(-3, 3)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_regression_derivatives.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_regression_derivatives.png")


# =====================================================
# Image 6: Binary Cross-Entropy (BCE) Loss
# =====================================================
def create_bce_loss():
    """Binary Cross-Entropy Loss cho Binary Classification"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    # Predicted probability range
    p_pred = np.linspace(0.001, 0.999, 200)

    # Case 1: y = 1 (positive class)
    y = 1
    bce = -(y * np.log(p_pred) + (1-y) * np.log(1-p_pred))

    ax1 = axes[0]
    ax1.plot(p_pred, bce, 'b-', linewidth=3)
    ax1.set_xlabel('Predicted Probability p̂', fontsize=12)
    ax1.set_ylabel('Binary Cross-Entropy Loss', fontsize=12)
    ax1.set_title('BCE when True Label y = 1\nL = -log(p̂)', fontsize=14, fontweight='bold')
    ax1.grid(True, alpha=0.3)

    # Annotations
    ax1.annotate('Loss = 0\n(Perfect prediction!)', xy=(1, 0), xytext=(0.7, 2),
                arrowprops=dict(arrowstyle='->', color='green'), fontsize=10, color='green')
    ax1.annotate('Loss → ∞\n(Wrong prediction!)', xy=(0, 10), xytext=(0.2, 7),
                arrowprops=dict(arrowstyle='->', color='red'), fontsize=10, color='red')

    # Case 2: y = 0 (negative class)
    y = 0
    bce = -(y * np.log(p_pred) + (1-y) * np.log(1-p_pred))

    ax2 = axes[1]
    ax2.plot(p_pred, bce, 'r-', linewidth=3)
    ax2.set_xlabel('Predicted Probability p̂', fontsize=12)
    ax2.set_ylabel('Binary Cross-Entropy Loss', fontsize=12)
    ax2.set_title('BCE when True Label y = 0\nL = -log(1 - p̂)', fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3)

    # Annotations
    ax2.annotate('Loss = 0\n(Perfect prediction!)', xy=(0, 0), xytext=(0.2, 2),
                arrowprops=dict(arrowstyle='->', color='green'), fontsize=10, color='green')
    ax2.annotate('Loss → ∞\n(Wrong prediction!)', xy=(1, 10), xytext=(0.7, 7),
                arrowprops=dict(arrowstyle='->', color='red'), fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_bce.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_bce.png")


# =====================================================
# Image 7: BCE Derivative (Gradient)
# =====================================================
def create_bce_derivative():
    """Đạo hàm của BCE Loss"""
    fig, ax = plt.subplots(1, 1, figsize=(10, 6))

    p_pred = np.linspace(0.001, 0.999, 200)

    # BCE derivative for y=1: dL/dp = -1/p
    # BCE derivative for y=0: dL/dp = 1/(1-p)

    # For y=1
    deriv_y1 = -1 / p_pred

    # For y=0
    deriv_y0 = 1 / (1 - p_pred)

    ax.plot(p_pred, deriv_y1, 'b-', linewidth=3, label='∂L/∂p̂ when y=1: -1/p̂')
    ax.plot(p_pred, deriv_y0, 'r-', linewidth=3, label='∂L/∂p̂ when y=0: 1/(1-p̂)')
    ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=0.5, color='gray', linestyle='--', alpha=0.5)

    ax.set_xlabel('Predicted Probability p̂', fontsize=12)
    ax.set_ylabel('Gradient ∂L/∂p̂', fontsize=12)
    ax.set_title('BCE Derivative (Gradient)\nLarge gradient when prediction is wrong!', fontsize=14, fontweight='bold')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.set_xlim(0, 1)
    ax.set_ylim(-20, 20)

    # Annotations
    ax.annotate('Gradient explodes\nwhen p̂ → 0 for y=1!', xy=(0.05, -15), xytext=(0.2, -10),
                arrowprops=dict(arrowstyle='->', color='blue'), fontsize=10, color='blue')
    ax.annotate('Gradient explodes\nwhen p̂ → 1 for y=0!', xy=(0.95, 15), xytext=(0.7, 10),
                arrowprops=dict(arrowstyle='->', color='red'), fontsize=10, color='red')

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_bce_derivative.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_bce_derivative.png")


# =====================================================
# Image 8: Gradient Descent Visualization
# =====================================================
def create_gradient_descent():
    """Minh họa Gradient Descent trên Loss Surface"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))

    # 2D Contour plot
    ax1 = axes[0]
    x = np.linspace(-3, 3, 100)
    y = np.linspace(-3, 3, 100)
    X, Y = np.meshgrid(x, y)
    Z = X**2 + Y**2  # Simple quadratic loss

    contour = ax1.contour(X, Y, Z, levels=15, cmap='viridis')
    ax1.clabel(contour, inline=True, fontsize=8)

    # Gradient descent path
    path_x = [2.5, 1.8, 1.2, 0.8, 0.5, 0.3, 0.15, 0.05]
    path_y = [2.5, 1.8, 1.2, 0.8, 0.5, 0.3, 0.15, 0.05]

    ax1.plot(path_x, path_y, 'r-', linewidth=2, marker='o', markersize=8, label='Gradient Descent')
    ax1.scatter([0], [0], color='green', s=150, marker='*', zorder=5, label='Global Minimum')
    ax1.set_xlabel('Weight w₁', fontsize=12)
    ax1.set_ylabel('Weight w₂', fontsize=12)
    ax1.set_title('Gradient Descent on Loss Surface\nFinding minimum step by step', fontsize=14, fontweight='bold')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 1D visualization
    ax2 = axes[1]
    w = np.linspace(-3, 3, 200)
    loss = w**2

    ax2.plot(w, loss, 'b-', linewidth=3, label='Loss L(w)')
    ax2.fill_between(w, loss, alpha=0.3)

    # Gradient descent points
    w_current = 2.5
    learning_rate = 0.1
    for i, (wx, wy) in enumerate(zip(path_x, path_y)):
        ax2.scatter([wx], [wy**2], color='red', s=80, zorder=5)
        if i < len(path_x) - 1:
            # Show gradient arrow
            grad = 2 * wx
            ax2.annotate('', xy=(path_x[i+1], loss[np.argmin(np.abs(w - path_x[i+1]))]),
                        xytext=(wx, wy**2),
                        arrowprops=dict(arrowstyle='->', color='red', lw=2))

    ax2.scatter([0], [0], color='green', s=150, marker='*', zorder=5, label='Minimum')
    ax2.set_xlabel('Weight w', fontsize=12)
    ax2.set_ylabel('Loss L(w)', fontsize=12)
    ax2.set_title('1D Gradient Descent\nFollowing the gradient down', fontsize=14, fontweight='bold')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_xlim(-3, 3)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_gradient_descent.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_gradient_descent.png")


# =====================================================
# Image 9: Loss Landscape with Multiple Minima
# =====================================================
def create_loss_landscape():
    """Minh họa Loss Landscape với nhiều local minima"""
    fig, ax = plt.subplots(1, 1, figsize=(12, 6))

    w = np.linspace(-3, 3, 500)
    # Non-convex loss function with multiple minima
    loss = 0.1*w**4 - w**2 + 0.5*w + 0.3*np.sin(3*w)

    ax.plot(w, loss, 'b-', linewidth=3)
    ax.fill_between(w, loss, min(loss)-0.5, alpha=0.3)

    # Mark local and global minima
    ax.scatter([-1.4], [loss[np.argmin(np.abs(w + 1.4))]], color='green', s=150, marker='o', zorder=5, label='Local Minima')
    ax.scatter([1.4], [loss[np.argmin(np.abs(w - 1.4))]], color='green', s=150, marker='o', zorder=5)
    ax.scatter([0], [min(loss)], color='red', s=200, marker='*', zorder=5, label='Global Minimum')

    ax.set_xlabel('Weight w', fontsize=12)
    ax.set_ylabel('Loss L(w)', fontsize=12)
    ax.set_title('Non-Convex Loss Landscape\nMultiple minima - optimization is hard!', fontsize=14, fontweight='bold')
    ax.legend()
    ax.grid(True, alpha=0.3)

    # Annotations
    ax.annotate('Gradient = 0 here\nbut not the best!', xy=(-1.4, loss[np.argmin(np.abs(w + 1.4))]),
                xytext=(-2.5, 1), arrowprops=dict(arrowstyle='->', color='green'), fontsize=10)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_landscape.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_landscape.png")


# =====================================================
# Image 10: Focal Loss Concept
# =====================================================
def create_focal_loss():
    """Minh họa Focal Loss - giải quyết class imbalance"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    # Probability range
    p_t = np.linspace(0.001, 0.999, 200)

    # BCE Loss
    bce = -np.log(p_t)

    # Focal Loss with different gamma values
    gamma_values = [0.5, 1.0, 2.0, 3.0]

    ax1 = axes[0]
    ax1.plot(p_t, bce, 'k--', linewidth=2, label='BCE (γ=0)', alpha=0.7)

    for gamma in gamma_values:
        focal = -(1 - p_t)**gamma * np.log(p_t)
        ax1.plot(p_t, focal, linewidth=2, label=f'Focal (γ={gamma})')

    ax1.set_xlabel('Correct Class Probability p_t', fontsize=12)
    ax1.set_ylabel('Loss', fontsize=12)
    ax1.set_title('Focal Loss: Focus on Hard Examples\nL = -(1-p_t)^γ * log(p_t)', fontsize=14, fontweight='bold')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    ax1.set_xlim(0, 1)
    ax1.set_ylim(0, 5)

    # Weighting factor
    ax2 = axes[1]
    for gamma in gamma_values:
        weight = (1 - p_t)**gamma
        ax2.plot(p_t, weight, linewidth=2, label=f'γ = {gamma}')

    ax2.set_xlabel('Correct Class Probability p_t', fontsize=12)
    ax2.set_ylabel('Weighting Factor (1-pt)^gamma', fontsize=12)
    ax2.set_title('Weighting Factor\nReduces loss for easy examples (high p_t)', fontsize=14, fontweight='bold')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_xlim(0, 1)
    ax2.set_ylim(0, 1.5)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_focal.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_focal.png")


# =====================================================
# Image 11: Cross-Entropy Visualization
# =====================================================
def create_cross_entropy():
    """Minh họa Cross-Entropy giữa hai phân phối"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    # Two distributions
    p_true = np.array([0.1, 0.1, 0.8])  # True distribution
    p_pred_range = np.linspace(0.01, 0.99, 100)

    # Cross-Entropy for different predicted distributions
    ax1 = axes[0]

    for class_idx in range(3):
        ce_values = []
        for p in p_pred_range:
            p_pred = np.array([p, 0.1, 0.9-p]) if class_idx == 0 else \
                     np.array([0.1, p, 0.9-p]) if class_idx == 1 else \
                     np.array([0.1, 0.1, p])
            ce = -np.sum(p_true * np.log(p_pred + 1e-10))
            ce_values.append(ce)

        labels = ['Class 0 probability', 'Class 1 probability', 'Class 2 probability']
        ax1.plot(p_pred_range, ce_values, linewidth=2, label=labels[class_idx])

    ax1.set_xlabel('Predicted Probability', fontsize=12)
    ax1.set_ylabel('Cross-Entropy Loss', fontsize=12)
    ax1.set_title('Cross-Entropy: Comparing Distributions\nH(P, Q) = -Σ P(x) log Q(x)', fontsize=14, fontweight='bold')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # KL Divergence visualization
    ax2 = axes[1]

    # Show how CE = H(P) + KL(P||Q)
    q_range = np.linspace(0.01, 0.99, 100)
    h_true = -np.sum(p_true * np.log(p_true + 1e-10))

    ce_values = []
    kl_values = []
    for q in q_range:
        p_pred = np.array([q, 0.1, 0.9-q])
        ce = -np.sum(p_true * np.log(p_pred + 1e-10))
        kl = np.sum(p_true * np.log((p_true + 1e-10) / (p_pred + 1e-10)))
        ce_values.append(ce)
        kl_values.append(kl)

    ax2.plot(q_range, ce_values, 'b-', linewidth=2, label='Cross-Entropy H(P,Q)')
    ax2.plot(q_range, kl_values, 'r-', linewidth=2, label='KL Divergence DKL(P||Q)')
    ax2.axhline(y=h_true, color='green', linestyle='--', linewidth=2, label=f'Entropy H(P) = {h_true:.3f}')

    ax2.set_xlabel('Predicted Distribution Q', fontsize=12)
    ax2.set_ylabel('Value', fontsize=12)
    ax2.set_title('CE = H(P) + KL(P||Q)\nMinimizing CE = minimizing KL!', fontsize=14, fontweight='bold')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/loss_cross_entropy.png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created: loss_cross_entropy.png")


# =====================================================
# Run all functions
# =====================================================
if __name__ == '__main__':
    import os
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print("Generating Loss Functions Images for Chapter 21.4")
    print("=" * 60)

    create_mle_concept()
    create_underflow_problem()
    create_mle_vs_nll()
    create_regression_losses()
    create_regression_derivatives()
    create_bce_loss()
    create_bce_derivative()
    create_gradient_descent()
    create_loss_landscape()
    create_focal_loss()
    create_cross_entropy()

    print("\n" + "=" * 60)
    print("✅ All Loss Functions images created successfully!")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)
