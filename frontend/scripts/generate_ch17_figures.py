#!/usr/bin/env python3
"""
Script to generate figures for Chapter 17.5 - Async Traits
Figures: 17-4 through 17-9
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle, Circle
import numpy as np

# Set style
plt.style.use('default')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 10

def create_figure_17_4():
    """Figure 17-4: A self-referential data type"""
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(5, 5.5, 'Figure 17-4: A self-referential data type',
            ha='center', fontsize=12, fontweight='bold')

    # Main table/box representing future
    box = FancyBboxPatch((2, 1), 6, 3.5, boxstyle="round,pad=0.1",
                         facecolor='#E8F4FD', edgecolor='#2196F3', linewidth=2)
    ax.add_patch(box)
    ax.text(5, 4, 'fut1', ha='center', fontsize=11, fontweight='bold')

    # Row 1: cell 0
    rect1 = FancyBboxPatch((2.5, 3), 5, 0.6, boxstyle="round,pad=0.05",
                           facecolor='white', edgecolor='#2196F3', linewidth=1)
    ax.add_patch(rect1)
    ax.text(5, 3.3, '0', ha='center', fontsize=10)

    # Row 2: cell 1
    rect2 = FancyBboxPatch((2.5, 2), 5, 0.6, boxstyle="round,pad=0.05",
                           facecolor='white', edgecolor='#2196F3', linewidth=1)
    ax.add_patch(rect2)
    ax.text(5, 2.3, '1', ha='center', fontsize=10)

    # Row 3: arrow pointing back to row 2
    rect3 = FancyBboxPatch((2.5, 1), 5, 0.6, boxstyle="round,pad=0.05",
                           facecolor='white', edgecolor='#2196F3', linewidth=1)
    ax.add_patch(rect3)

    # Arrow from row 3 back to row 2
    ax.annotate('', xy=(5, 2.6), xytext=(5, 1.6),
                arrowprops=dict(arrowstyle='->', color='#FF5722', lw=2))
    ax.text(5.5, 2.1, 'ref', ha='left', fontsize=9, color='#FF5722')

    ax.text(5, 0.3, '(internal reference)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-4.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-4.png")

def create_figure_17_5():
    """Figure 17-5: The unsafe result of moving a self-referential data type"""
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 5)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(6, 4.5, 'Figure 17-5: The unsafe result of moving a self-referential data type',
            ha='center', fontsize=12, fontweight='bold')

    # fut1 (grayed out - old location)
    box1 = FancyBboxPatch((0.5, 1.5), 4, 2.5, boxstyle="round,pad=0.1",
                          facecolor='#CCCCCC', edgecolor='#999999', linewidth=2, alpha=0.7)
    ax.add_patch(box1)
    ax.text(2.5, 3.5, 'fut1', ha='center', fontsize=11, fontweight='bold', color='#666666')
    ax.text(2.5, 2.8, '?', ha='center', fontsize=10, color='#666666')
    ax.text(2.5, 2.2, '?', ha='center', fontsize=10, color='#666666')
    ax.text(2.5, 1.6, '?', ha='center', fontsize=10, color='#666666')
    ax.text(2.5, 1.2, '(unknown memory)', ha='center', fontsize=8, style='italic', color='#666666')

    # Arrow pointing from fut2 to old location
    ax.annotate('', xy=(2.5, 2.5), xytext=(7.5, 2.5),
                arrowprops=dict(arrowstyle='->', color='#FF5722', lw=2))
    ax.text(5, 2.7, 'ref', ha='center', fontsize=9, color='#FF5722')

    # fut2 (new location with valid data)
    box2 = FancyBboxPatch((7.5, 1.5), 4, 2.5, boxstyle="round,pad=0.1",
                          facecolor='#E8F4FD', edgecolor='#2196F3', linewidth=2)
    ax.add_patch(box2)
    ax.text(9.5, 3.5, 'fut2', ha='center', fontsize=11, fontweight='bold')
    ax.text(9.5, 2.8, '0', ha='center', fontsize=10)
    ax.text(9.5, 2.2, '1', ha='center', fontsize=10)

    # Arrow from row 3 in fut2 to fut1's old location (dangling pointer)
    ax.annotate('', xy=(7, 1.6), xytext=(9.5, 2.1),
                arrowprops=dict(arrowstyle='->', color='#FF5722', lw=2, linestyle='--'))
    ax.text(7.5, 1.5, 'dangling!', ha='center', fontsize=8, color='red', style='italic')

    ax.text(6, 0.5, '(pointer referencing old location in memory)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-5.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-5.png")

def create_figure_17_6():
    """Figure 17-6: Pinning a Box that points to a self-referential future type"""
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 5)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(6, 4.5, 'Figure 17-6: Pinning a Box that points to a self-referential future type',
            ha='center', fontsize=12, fontweight='bold')

    # Pin box (left)
    pin_box = FancyBboxPatch((1, 2), 2, 1, boxstyle="round,pad=0.1",
                             facecolor='#FFF9C4', edgecolor='#FBC02D', linewidth=2)
    ax.add_patch(pin_box)
    ax.text(2, 2.5, 'Pin', ha='center', fontsize=11, fontweight='bold')

    # Arrow from Pin to b1
    ax.annotate('', xy=(3.5, 2.5), xytext=(3, 2.5),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # b1 box
    b1_box = FancyBboxPatch((3.5, 2), 1.5, 1, boxstyle="round,pad=0.1",
                            facecolor='#E3F2FD', edgecolor='#2196F3', linewidth=2)
    ax.add_patch(b1_box)
    ax.text(4.25, 2.5, 'b1', ha='center', fontsize=10)

    # Arrow through b1 to pinned
    ax.annotate('', xy=(6, 2.5), xytext=(5, 2.5),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # Pinned box (right)
    pinned_box = FancyBboxPatch((6, 1), 5, 3, boxstyle="round,pad=0.1",
                               facecolor='#E8F4FD', edgecolor='#2196F3', linewidth=3)
    ax.add_patch(pinned_box)
    ax.text(8.5, 3.5, 'pinned', ha='center', fontsize=11, fontweight='bold')

    # Inner table (future)
    inner_box = FancyBboxPatch((6.5, 1.5), 4, 2, boxstyle="round,pad=0.05",
                               facecolor='white', edgecolor='#2196F3', linewidth=1)
    ax.add_patch(inner_box)
    ax.text(8.5, 3, 'fut', ha='center', fontsize=10, fontweight='bold')
    ax.text(7, 2.3, '0', ha='center', fontsize=9)

    # Arrow from row 2 to row 3
    ax.annotate('', xy=(8.5, 1.8), xytext=(8.5, 2.2),
                arrowprops=dict(arrowstyle='->', color='#FF5722', lw=1.5))
    ax.text(8.8, 2, 'ref', ha='left', fontsize=8, color='#FF5722')

    ax.text(7, 1.3, '1', ha='center', fontsize=9)
    ax.text(8.5, 1.3, '...', ha='center', fontsize=9)

    # Legend
    ax.text(8.5, 0.5, '(Pin guarantees data does not move)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-6.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-6.png")

def create_figure_17_7():
    """Figure 17-7: Moving a Box which points to a self-referential future type"""
    fig, ax = plt.subplots(figsize=(10, 4))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 5)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(7, 4.5, 'Figure 17-7: Moving a Box which points to a self-referential future type',
            ha='center', fontsize=12, fontweight='bold')

    # Pin box (left) - same as before
    pin_box = FancyBboxPatch((1, 2), 2, 1, boxstyle="round,pad=0.1",
                             facecolor='#FFF9C4', edgecolor='#FBC02D', linewidth=2)
    ax.add_patch(pin_box)
    ax.text(2, 2.5, 'Pin', ha='center', fontsize=11, fontweight='bold')

    # Arrow from Pin to b2 (not b1)
    ax.annotate('', xy=(5.5, 2.5), xytext=(3, 2.5),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # b1 box (grayed out)
    b1_box = FancyBboxPatch((3.5, 2), 1.5, 1, boxstyle="round,pad=0.1",
                            facecolor='#E0E0E0', edgecolor='#9E9E9E', linewidth=2)
    ax.add_patch(b1_box)
    ax.text(4.25, 2.5, 'b1', ha='center', fontsize=10, color='#9E9E9E')

    # b2 box (new active pointer)
    b2_box = FancyBboxPatch((5.5, 2), 1.5, 1, boxstyle="round,pad=0.1",
                            facecolor='#E3F2FD', edgecolor='#2196F3', linewidth=2)
    ax.add_patch(b2_box)
    ax.text(6.25, 2.5, 'b2', ha='center', fontsize=10)

    # Arrow through b2 to pinned
    ax.annotate('', xy=(8, 2.5), xytext=(7, 2.5),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # Pinned box (same location)
    pinned_box = FancyBboxPatch((8, 1), 5, 3, boxstyle="round,pad=0.1",
                               facecolor='#E8F4FD', edgecolor='#2196F3', linewidth=3)
    ax.add_patch(pinned_box)
    ax.text(10.5, 3.5, 'pinned', ha='center', fontsize=11, fontweight='bold')

    # Inner table (future) - unchanged!
    inner_box = FancyBboxPatch((8.5, 1.5), 4, 2, boxstyle="round,pad=0.05",
                               facecolor='white', edgecolor='#2196F3', linewidth=1)
    ax.add_patch(inner_box)
    ax.text(10.5, 3, 'fut', ha='center', fontsize=10, fontweight='bold')
    ax.text(9, 2.3, '0', ha='center', fontsize=9)

    # Arrow from row 2 to row 3 (still pointing to correct location!)
    ax.annotate('', xy=(10.5, 1.8), xytext=(10.5, 2.2),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=1.5))
    ax.text(10.8, 2, 'ref', ha='left', fontsize=8, color='#4CAF50')

    ax.text(9, 1.3, '1', ha='center', fontsize=9)
    ax.text(10.5, 1.3, '...', ha='center', fontsize=9)

    # Legend
    ax.text(10.5, 0.5, '(Box moved, but pinned data stayed in place!)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-7.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-7.png")

def create_figure_17_8():
    """Figure 17-8: Pinning a String"""
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(5, 3.5, "Figure 17-8: Pinning a String",
            ha='center', fontsize=12, fontweight='bold')

    # Pin box
    pin_box = FancyBboxPatch((0.5, 1.5), 2, 0.8, boxstyle="round,pad=0.1",
                             facecolor='#FFF9C4', edgecolor='#FBC02D', linewidth=2)
    ax.add_patch(pin_box)
    ax.text(1.5, 1.9, 'Pin', ha='center', fontsize=11, fontweight='bold')

    # Arrow to String
    ax.annotate('', xy=(3.5, 1.9), xytext=(2.5, 1.9),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # String box
    str_box = FancyBboxPatch((3.5, 1), 5, 1.5, boxstyle="round,pad=0.1",
                             facecolor='#C8E6C9', edgecolor='#4CAF50', linewidth=2)
    ax.add_patch(str_box)
    ax.text(6, 2.2, 'String', ha='center', fontsize=11, fontweight='bold')

    # String contents
    ax.text(4.2, 1.5, '5usize', ha='left', fontsize=9, fontfamily='monospace')
    ax.text(4.2, 1.15, 'h e l l o', ha='left', fontsize=9, fontfamily='monospace')

    # Dotted rectangle around String (not Pin)
    dotted = FancyBboxPatch((3.3, 0.8), 5.4, 1.9, boxstyle="round,pad=0.05",
                           facecolor='none', edgecolor='#4CAF50', linewidth=1, linestyle='--')
    ax.add_patch(dotted)

    ax.text(6, 0.4, '(String implements Unpin - not pinned)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-8.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-8.png")

def create_figure_17_9():
    """Figure 17-9: Replacing the String with an entirely different String in memory"""
    fig, ax = plt.subplots(figsize=(8, 3.5))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 4)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    ax.text(6, 3.5, "Figure 17-9: Replacing the String with an entirely different String in memory",
            ha='center', fontsize=12, fontweight='bold')

    # Pin box
    pin_box = FancyBboxPatch((0.5, 1.5), 2, 0.8, boxstyle="round,pad=0.1",
                             facecolor='#FFF9C4', edgecolor='#FBC02D', linewidth=2)
    ax.add_patch(pin_box)
    ax.text(1.5, 1.9, 'Pin', ha='center', fontsize=11, fontweight='bold')

    # Arrow to s2 (new string)
    ax.annotate('', xy=(3.5, 1.9), xytext=(2.5, 1.9),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # s1 (grayed out - old)
    s1_box = FancyBboxPatch((3.5, 1), 3.5, 1.5, boxstyle="round,pad=0.1",
                             facecolor='#E0E0E0', edgecolor='#9E9E9E', linewidth=2)
    ax.add_patch(s1_box)
    ax.text(5.25, 2.2, 's1', ha='center', fontsize=10, fontweight='bold', color='#9E9E9E')
    ax.text(4, 1.5, '5usize', ha='left', fontsize=8, fontfamily='monospace', color='#9E9E9E')
    ax.text(4, 1.15, 'h e l l o', ha='left', fontsize=8, fontfamily='monospace', color='#9E9E9E')

    # Arrow from Pin to s2 (new)
    ax.annotate('', xy=(8.5, 1.9), xytext=(7.5, 1.9),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2))

    # s2 (new valid string)
    s2_box = FancyBboxPatch((7.5, 1), 3.5, 1.5, boxstyle="round,pad=0.1",
                            facecolor='#C8E6C9', edgecolor='#4CAF50', linewidth=2)
    ax.add_patch(s2_box)
    ax.text(9.25, 2.2, 's2', ha='center', fontsize=10, fontweight='bold')
    ax.text(8, 1.5, '7usize', ha='left', fontsize=8, fontfamily='monospace')
    ax.text(8, 1.15, 'g o o d b y e', ha='left', fontsize=8, fontfamily='monospace')

    # Dotted rectangle around s2 (Unpin)
    dotted = FancyBboxPatch((7.3, 0.8), 3.9, 1.9, boxstyle="round,pad=0.05",
                           facecolor='none', edgecolor='#4CAF50', linewidth=1, linestyle='--')
    ax.add_patch(dotted)

    ax.text(9.25, 0.4, '(Safe to replace - String implements Unpin)', ha='center', fontsize=9, style='italic')

    plt.tight_layout()
    plt.savefig('/home/quan/Desktop/KaiRust/frontend/public/images/ch17/fig17-9.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print("Created fig17-9.png")

if __name__ == '__main__':
    import os
    # Create directory if it doesn't exist
    os.makedirs('/home/quan/Desktop/KaiRust/frontend/public/images/ch17', exist_ok=True)

    create_figure_17_4()
    create_figure_17_5()
    create_figure_17_6()
    create_figure_17_7()
    create_figure_17_8()
    create_figure_17_9()

    print("\nAll figures created successfully!")
