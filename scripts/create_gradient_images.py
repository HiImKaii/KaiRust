#!/usr/bin/env python3
"""
Tạo các hình ảnh minh họa cho bài học Gradient Descent
Chương 21 - Bài 5: Gradient Descent & Optimizers
"""

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch
import os

# Tạo thư mục lưu ảnh nếu chưa tồn tại
output_dir = "/home/quan/Desktop/KaiRust/frontend/public/images/ch21"
os.makedirs(output_dir, exist_ok=True)

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.size'] = 12
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['figure.facecolor'] = 'white'

# =====================================================
# HÌNH 1: Đạo hàm và Gradient trên hàm f(x) = x^2
# =====================================================
def create_derivative_visualization():
    """Hình ảnh minh họa đạo hàm trên hàm f(x) = x^2"""
    fig, ax = plt.subplots(figsize=(12, 8))

    # Vẽ đồ thị hàm số
    x = np.linspace(-4, 4, 200)
    y = x**2
    ax.plot(x, y, 'b-', linewidth=2.5, label='f(x) = x²')

    # Các điểm đặc biệt và tiếp tuyến
    points = [(-3, 9), (-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4), (3, 9)]
    colors = ['red', 'red', 'red', 'green', 'orange', 'orange', 'orange']

    for i, (xi, yi) in enumerate(points):
        # Vẽ điểm
        ax.scatter([xi], [yi], c=colors[i], s=100, zorder=5)

        # Tính đạo hàm tại điểm đó
        deriv = 2 * xi

        # Vẽ tiếp tuyến
        if abs(deriv) > 0.1:  # Tránh vẽ tiếp tuyến tại điểm 0
            tangent_x = np.array([xi - 1, xi + 1])
            tangent_y = yi + deriv * (tangent_x - xi)
            ax.plot(tangent_x, tangent_y, '--', color=colors[i], alpha=0.7, linewidth=1.5)

        # Thêm nhãn
        label = f'x={xi}\nf\'(x)={deriv}'
        offset_x = 0.3 if xi >= 0 else -0.3
        offset_y = 0.5 if yi > 1 else 0.3
        ax.annotate(label, (xi, yi), xytext=(xi + offset_x, yi + offset_y),
                   fontsize=9, ha='left' if xi >= 0 else 'right')

    # Thêm mũi tên chỉ hướng
    ax.annotate('', xy=(-2.5, 6), xytext=(-2.8, 7.2),
               arrowprops=dict(arrowstyle='->', color='red', lw=2))
    ax.text(-3.2, 7.5, 'f\' < 0\n(đi xuống)', fontsize=10, color='red')

    ax.annotate('', xy=(2.5, 6), xytext=(2.8, 7.2),
               arrowprops=dict(arrowstyle='->', color='orange', lw=2))
    ax.text(2.5, 7.5, 'f\' > 0\n(đi lên)', fontsize=10, color='orange')

    ax.axhline(y=0, color='k', linewidth=0.5)
    ax.axvline(x=0, color='k', linewidth=0.5)
    ax.set_xlim(-4.5, 4.5)
    ax.set_ylim(-1, 11)
    ax.set_xlabel('x')
    ax.set_ylabel('f(x)')
    ax.set_title('Đạo hàm f\'(x) = 2x: Hướng dốc lên/xuống tại mỗi điểm', fontsize=14, fontweight='bold')
    ax.legend(loc='upper right')

    plt.tight_layout()
    plt.savefig(f'{output_dir}/derivative_visualization.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/derivative_visualization.png")

# =====================================================
# HÌNH 2: Gradient Descent - Bước đi từ đỉnh xuống đáy
# =====================================================
def create_gradient_descent_visualization():
    """Hình ảnh minh họa Gradient Descent"""
    fig, ax = plt.subplots(figsize=(12, 8))

    # Vẽ đồ thị hàm số
    x = np.linspace(-5, 5, 200)
    y = x**2
    ax.plot(x, y, 'b-', linewidth=2.5, label='Loss L = w²')

    # Mô phỏng Gradient Descent
    w_current = 4.5
    learning_rate = 0.1
    path_x = [w_current]
    path_y = [w_current**2]

    for step in range(20):
        gradient = 2 * w_current
        w_new = w_current - learning_rate * gradient
        path_x.append(w_new)
        path_y.append(w_new**2)
        w_current = w_new

    # Vẽ đường đi của Gradient Descent
    ax.scatter(path_x[0], path_y[0], c='red', s=150, marker='*', zorder=10, label='Điểm bắt đầu')
    ax.scatter(path_x[-1], path_y[-1], c='green', s=150, marker='*', zorder=10, label='Điểm hội tụ')

    # Vẽ các bước đi
    for i in range(len(path_x) - 1):
        color = plt.cm.Reds(1 - i/len(path_x))
        ax.annotate('', xy=(path_x[i+1], path_y[i+1]), xytext=(path_x[i], path_y[i]),
                   arrowprops=dict(arrowstyle='->', color=color, lw=2))

    # Vẽ gradient tại điểm bắt đầu
    grad = 2 * path_x[0]
    ax.annotate('', xy=(path_x[0] - 0.3*grad*0.1, path_y[0] + grad*0.3),
               xytext=(path_x[0], path_y[0]),
               arrowprops=dict(arrowstyle='->', color='purple', lw=3))

    ax.text(path_x[0]+0.3, path_y[0]+1.5, f'Gradient ∇L = {grad:.1f}\n(Hướng lên)', fontsize=10, color='purple')

    # Vẽ hướng đi xuống
    ax.annotate('', xy=(path_x[0] - 0.3*grad*0.1, path_y[0] - abs(grad)*0.5),
               xytext=(path_x[0], path_y[0]),
               arrowprops=dict(arrowstyle='->', color='red', lw=3, linestyle='dashed'))

    ax.text(path_x[0]-1.5, path_y[0]-2, 'W - η×∇L\n(Hướng xuống)', fontsize=10, color='red', ha='center')

    ax.axhline(y=0, color='k', linewidth=0.5)
    ax.axvline(x=0, color='k', linewidth=0.5)
    ax.set_xlim(-5.5, 5.5)
    ax.set_ylim(-1, 25)
    ax.set_xlabel('w (weight)')
    ax.set_ylabel('Loss L')
    ax.set_title('Gradient Descent: Từ đỉnh (w=4.5) xuống cực tiểu (w=0)', fontsize=14, fontweight='bold')
    ax.legend(loc='upper right')

    plt.tight_layout()
    plt.savefig(f'{output_dir}/gradient_descent_visualization.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/gradient_descent_visualization.png")

# =====================================================
# HÌNH 3: So sánh Learning Rate
# =====================================================
def create_learning_rate_comparison():
    """So sánh các Learning Rate khác nhau"""
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    learning_rates = [0.01, 0.1, 0.9]
    titles = ['Learning Rate = 0.01 (Quá nhỏ)', 'Learning Rate = 0.1 (Phù hợp)', 'Learning Rate = 0.9 (Quá lớn)']

    for idx, (lr, title) in enumerate(zip(learning_rates, titles)):
        ax = axes[idx]

        # Vẽ hàm số
        x = np.linspace(-5, 5, 200)
        y = x**2
        ax.plot(x, y, 'b-', linewidth=2)

        # Mô phỏng GD
        w_current = 4.0
        path_x = [w_current]
        path_y = [w_current**2]

        for step in range(15):
            gradient = 2 * w_current
            w_new = w_current - lr * gradient
            path_x.append(w_new)
            path_y.append(w_new**2)
            w_current = w_new

        # Vẽ đường đi
        ax.plot(path_x, path_y, 'r-o', linewidth=1.5, markersize=4, alpha=0.7)
        ax.scatter(path_x[0], path_y[0], c='red', s=100, marker='*', zorder=10)
        ax.scatter(path_x[-1], path_y[-1], c='green', s=100, marker='*', zorder=10)

        ax.axhline(y=0, color='k', linewidth=0.5)
        ax.axvline(x=0, color='k', linewidth=0.5)
        ax.set_xlim(-5, 5)
        ax.set_ylim(-1, 20)
        ax.set_xlabel('w')
        ax.set_ylabel('Loss')
        ax.set_title(title, fontsize=12, fontweight='bold')

    plt.tight_layout()
    plt.savefig(f'{output_dir}/learning_rate_comparison.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/learning_rate_comparison.png")

# =====================================================
# HÌNH 4: Gradient Descent 3D Surface
# =====================================================
def create_3d_surface():
    """Hình 3D của hàm mất mát với nhiều cực tiểu"""
    fig = plt.figure(figsize=(12, 8))
    ax = fig.add_subplot(111, projection='3d')

    # Tạo lưới
    x = np.linspace(-3, 3, 50)
    y = np.linspace(-3, 3, 50)
    X, Y = np.meshgrid(x, y)

    # Hàm mất mát đơn giản (giống bowl)
    Z = X**2 + Y**2

    # Vẽ mặt cong
    surf = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.7, edgecolor='none')

    # Đường đi của Gradient Descent
    w1, w2 = 2.5, 2.5
    lr = 0.1
    path_x = [w1]
    path_y = [w2]
    path_z = [w1**2 + w2**2]

    for _ in range(20):
        grad1 = 2 * w1
        grad2 = 2 * w2
        w1 = w1 - lr * grad1
        w2 = w2 - lr * grad2
        path_x.append(w1)
        path_y.append(w2)
        path_z.append(w1**2 + w2**2)

    ax.plot(path_x, path_y, path_z, 'r-', linewidth=3, label='Gradient Descent Path')
    ax.scatter([path_x[0]], [path_y[0]], [path_z[0]], c='red', s=100, marker='*', label='Start')
    ax.scatter([path_x[-1]], [path_y[-1]], [path_z[-1]], c='green', s=100, marker='*', label='End')

    ax.set_xlabel('w₁')
    ax.set_ylabel('w₂')
    ax.set_zlabel('Loss')
    ax.set_title('Gradient Descent trên mặt cong Loss 3D', fontsize=14, fontweight='bold')
    ax.legend()

    plt.tight_layout()
    plt.savefig(f'{output_dir}/gradient_descent_3d.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/gradient_descent_3d.png")

# =====================================================
# HÌNH 5: Gradient Descent 2D Contour
# =====================================================
def create_contour_plot():
    """Biểu đồ đường đồng mức 2D"""
    fig, ax = plt.subplots(figsize=(10, 8))

    # Tạo lưới
    x = np.linspace(-3, 3, 200)
    y = np.linspace(-3, 3, 200)
    X, Y = np.meshgrid(x, y)

    # Hàm mất mát
    Z = X**2 + Y**2

    # Vẽ đường đồng mức
    contour = ax.contour(X, Y, Z, levels=20, cmap='viridis', alpha=0.8)
    ax.clabel(contour, inline=True, fontsize=8, fmt='%.1f')

    # Đường đi của Gradient Descent từ nhiều điểm
    starting_points = [(2.5, 2.5), (-2.5, 2.5), (2.5, -2.5), (-2.5, -2.5)]
    colors = ['red', 'blue', 'green', 'orange']

    for (w1_start, w2_start), color in zip(starting_points, colors):
        w1, w2 = w1_start, w2_start
        lr = 0.1
        path_x = [w1]
        path_y = [w2]

        for _ in range(25):
            grad1 = 2 * w1
            grad2 = 2 * w2
            w1 = w1 - lr * grad1
            w2 = w2 - lr * grad2
            path_x.append(w1)
            path_y.append(w2)

        ax.plot(path_x, path_y, '-', color=color, linewidth=2, alpha=0.8)
        ax.scatter([path_x[0]], [path_y[0]], c=color, s=80, marker='o')
        ax.scatter([path_x[-1]], [path_y[-1]], c=color, s=80, marker='*')

    ax.set_xlabel('w₁ (weight 1)', fontsize=12)
    ax.set_ylabel('w₂ (weight 2)', fontsize=12)
    ax.set_title('Gradient Descent trên đường đồng mức\n(Bắt đầu từ 4 góc, hội tụ về tâm)', fontsize=14, fontweight='bold')
    ax.set_aspect('equal')

    plt.tight_layout()
    plt.savefig(f'{output_dir}/gradient_descent_contour.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/gradient_descent_contour.png")

# =====================================================
# HÌNH 6: Minh họa đạo hàm riêng phần và Gradient Vector
# =====================================================
def create_partial_derivative_visualization():
    """Minh họa đạo hàm riêng phần trong không gian 2D"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))

    # Hình trái: Đạo hàm riêng phần theo w1
    ax1 = axes[0]
    x1 = np.linspace(-3, 3, 100)
    x2 = 1.0  # Cố định x2

    # Với f(w1, w2) = w1^2 + w2^2, khi w2 = 1
    y = x1**2 + x2**2
    ax1.plot(x1, y, 'b-', linewidth=2)
    ax1.axhline(y=x2**2, color='gray', linestyle='--', alpha=0.5)

    # Điểm cụ thể
    x1_point = 1.5
    y_point = x1_point**2 + x2**2
    deriv_partial = 2 * x1_point

    ax1.scatter([x1_point], [y_point], c='red', s=100, zorder=5)
    # Tiếp tuyến
    tangent_x = np.linspace(x1_point - 0.8, x1_point + 0.8, 50)
    tangent_y = y_point + deriv_partial * (tangent_x - x1_point)
    ax1.plot(tangent_x, tangent_y, 'r--', linewidth=2, label=f'Tiếp tuyến: slope = ∂L/∂w₁ = {deriv_partial}')

    ax1.set_xlabel('w₁', fontsize=12)
    ax1.set_ylabel('L', fontsize=12)
    ax1.set_title('Đạo hàm riêng phần ∂L/∂w₁\n(w2 cố định = 1.0)', fontsize=12, fontweight='bold')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Hình phải: Gradient vector
    ax2 = axes[1]

    # Vẽ đường đồng mức
    x1 = np.linspace(-3, 3, 100)
    x2 = np.linspace(-3, 3, 100)
    X1, X2 = np.meshgrid(x1, x2)
    Z = X1**2 + X2**2
    contour = ax2.contour(X1, X2, Z, levels=15, cmap='viridis', alpha=0.7)

    # Điểm cần vẽ gradient
    w1, w2 = 1.5, 1.0
    grad1, grad2 = 2*w1, 2*w2
    grad_norm = np.sqrt(grad1**2 + grad2**2)

    # Vẽ gradient vector (hướng lên - màu đỏ)
    ax2.arrow(w1, w2, grad1/grad_norm*0.5, grad2/grad_norm*0.5,
             head_width=0.1, head_length=0.05, fc='red', ec='red', linewidth=2,
             label=f'∇L = [{grad1}, {grad2}] (hướng lên)')

    # Vẽ negative gradient (hướng xuống - màu xanh)
    ax2.arrow(w1, w2, -grad1/grad_norm*0.5, -grad2/grad_norm*0.5,
             head_width=0.1, head_length=0.05, fc='blue', ec='blue', linewidth=2,
             label=f'-∇L = [{-grad1}, {-grad2}] (hướng xuống)')

    ax2.scatter([w1], [w2], c='green', s=100, marker='o', zorder=10)
    ax2.set_xlabel('w₁', fontsize=12)
    ax2.set_ylabel('w₂', fontsize=12)
    ax2.set_title('Gradient Vector ∇L\n(Vector của mọi đạo hàm riêng phần)', fontsize=12, fontweight='bold')
    ax2.legend(loc='upper right')
    ax2.set_aspect('equal')
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/partial_derivative_visualization.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/partial_derivative_visualization.png")

# =====================================================
# HÌNH 7: So sánh 3 phương pháp GD
# =====================================================
def create_gd_methods_comparison():
    """So sánh Batch, Stochastic, Mini-batch GD"""
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    # Hàm mất mát đơn giản
    def loss(w): return w**2
    def gradient(w): return 2*w

    # Dữ liệu mẫu
    data = np.array([-3.0, -2.0, -1.0, 1.0, 2.0, 3.0])
    x_range = np.linspace(-4, 4, 100)

    # Batch GD
    ax = axes[0]
    ax.plot(x_range, loss(x_range), 'b-', linewidth=2)
    w = 3.5
    path_x = [w]
    path_y = [loss(w)]
    for epoch in range(10):
        avg_grad = np.mean([gradient(w) for _ in data])
        w = w - 0.1 * avg_grad
        path_x.append(w)
        path_y.append(loss(w))
    ax.plot(path_x, path_y, 'r-o', linewidth=1.5, markersize=5)
    ax.set_title('Batch GD\n(Tính trên toàn bộ dữ liệu)', fontweight='bold')
    ax.set_xlabel('w')
    ax.set_ylabel('Loss')
    ax.grid(True, alpha=0.3)

    # SGD
    ax = axes[1]
    ax.plot(x_range, loss(x_range), 'b-', linewidth=2)
    w = 3.5
    path_x = [w]
    path_y = [loss(w)]
    np.random.seed(42)
    for epoch in range(3):
        for _ in range(len(data)):
            idx = np.random.randint(len(data))
            grad = gradient(w)
            w = w - 0.05 * grad
            path_x.append(w)
            path_y.append(loss(w))
    ax.plot(path_x, path_y, 'r-o', linewidth=1, markersize=3, alpha=0.7)
    ax.set_title('SGD\n(Từng mẫu một - Zigzag)', fontweight='bold')
    ax.set_xlabel('w')
    ax.set_ylabel('Loss')
    ax.grid(True, alpha=0.3)

    # Mini-batch
    ax = axes[2]
    ax.plot(x_range, loss(x_range), 'b-', linewidth=2)
    w = 3.5
    path_x = [w]
    path_y = [loss(w)]
    batch_size = 3
    for epoch in range(10):
        for i in range(0, len(data), batch_size):
            batch = data[i:i+batch_size]
            avg_grad = np.mean([gradient(w) for _ in batch])
            w = w - 0.08 * avg_grad
            path_x.append(w)
            path_y.append(loss(w))
    ax.plot(path_x, path_y, 'r-o', linewidth=1.5, markersize=4)
    ax.set_title('Mini-Batch GD\n(Kết hợp - CHUẨN VÀNG)', fontweight='bold')
    ax.set_xlabel('w')
    ax.set_ylabel('Loss')
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/gd_methods_comparison.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Đã tạo: {output_dir}/gd_methods_comparison.png")

# =====================================================
# Chạy tất cả các hàm tạo hình
# =====================================================
if __name__ == "__main__":
    print("=" * 60)
    print("TẠO CÁC HÌNH ẢNH MINH HỌA CHO BÀI HỌC GRADIENT DESCENT")
    print("=" * 60)

    create_derivative_visualization()
    create_gradient_descent_visualization()
    create_learning_rate_comparison()
    create_3d_surface()
    create_contour_plot()
    create_partial_derivative_visualization()
    create_gd_methods_comparison()

    print("=" * 60)
    print("HOÀN TẤT! Tất cả hình ảnh đã được lưu vào:")
    print(f"{output_dir}")
    print("=" * 60)
