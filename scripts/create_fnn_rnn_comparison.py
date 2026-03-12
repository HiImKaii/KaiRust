#!/usr/bin/env python3
"""
Tạo ảnh so sánh FNN vs RNN - Đơn giản
"""

import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyArrowPatch
import matplotlib.patches as mpatches

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 4))
fig.patch.set_facecolor('white')

# ============ FNN ============
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 10)
ax1.set_aspect('equal')
ax1.axis('off')
ax1.set_title('FNN', fontsize=14, fontweight='bold')

# Input
for y in [3, 5, 7]:
    c = Circle((2, y), 0.4, facecolor='#3498db', edgecolor='black', linewidth=1.5)
    ax1.add_patch(c)

# Hidden
for y in [3.5, 5, 6.5]:
    c = Circle((5, y), 0.35, facecolor='#f39c12', edgecolor='black', linewidth=1.5)
    ax1.add_patch(c)

# Output
c = Circle((8, 5), 0.5, facecolor='#27ae60', edgecolor='black', linewidth=1.5)
ax1.add_patch(c)

# Arrows
for y1 in [3, 5, 7]:
    for y2 in [3.5, 5, 6.5]:
        ax1.annotate('', xy=(5-0.35, y2), xytext=(2+0.4, y1),
                    arrowprops=dict(arrowstyle='->', color='gray', lw=0.8))

for y in [3.5, 5, 6.5]:
    ax1.annotate('', xy=(8-0.5, 5), xytext=(5+0.35, y),
                arrowprops=dict(arrowstyle='->', color='gray', lw=0.8))

ax1.text(2, 1.5, 'INPUT', ha='center', fontsize=9, color='#3498db', fontweight='bold')
ax1.text(5, 1.5, 'HIDDEN', ha='center', fontsize=9, color='#f39c12', fontweight='bold')
ax1.text(8, 1.5, 'OUTPUT', ha='center', fontsize=9, color='#27ae60', fontweight='bold')

# ============ RNN ============
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.set_aspect('equal')
ax2.axis('off')
ax2.set_title('RNN', fontsize=14, fontweight='bold')

# t=1
c1 = Circle((2, 5), 0.35, facecolor='#3498db', edgecolor='black', linewidth=1.5)
ax2.add_patch(c1)
c2 = Circle((4, 5), 0.35, facecolor='#f39c12', edgecolor='black', linewidth=1.5)
ax2.add_patch(c2)
ax2.annotate('', xy=(4-0.35, 5), xytext=(2+0.35, 5), arrowprops=dict(arrowstyle='->', color='gray', lw=1))

# t=2
c3 = Circle((6, 5), 0.35, facecolor='#3498db', edgecolor='black', linewidth=1.5)
ax2.add_patch(c3)
c4 = Circle((8, 5), 0.35, facecolor='#f39c12', edgecolor='black', linewidth=1.5)
ax2.add_patch(c4)
ax2.annotate('', xy=(8-0.35, 5), xytext=(6+0.35, 5), arrowprops=dict(arrowstyle='->', color='gray', lw=1))

# Recurrent arrow
ax2.annotate('', xy=(6.65, 5), xytext=(4-0.65, 5), arrowprops=dict(arrowstyle='->', color='#e74c3c', lw=2))
ax2.annotate('', xy=(3.65, 6), xytext=(4.35, 6), arrowprops=dict(arrowstyle='->', color='#e74c3c', lw=1.5))

ax2.text(3, 2, 't=1', ha='center', fontsize=9, color='gray')
ax2.text(7, 2, 't=2', ha='center', fontsize=9, color='gray')
ax2.text(5, 8.5, 'Hidden State', ha='center', fontsize=9, color='#f39c12', fontweight='bold')

# Legend
legend = [
    mpatches.Patch(facecolor='#3498db', label='Input'),
    mpatches.Patch(facecolor='#f39c12', label='Hidden'),
    mpatches.Patch(facecolor='#e74c3c', label='Recurrent'),
]
fig.legend(handles=legend, loc='lower center', ncol=3, fontsize=9,
          bbox_to_anchor=(0.5, -0.02), frameon=True)

plt.tight_layout(rect=[0, 0.1, 1, 0.95])
plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch22/fnn_vs_rnn_diagram.png',
           dpi=120, bbox_inches='tight', facecolor='white')
print("Da luu")
plt.close()
