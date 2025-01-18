import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export function rehypePreButton() {
  return (tree) => {
    // Thêm script vào đầu document
    const script = h('script', {}, `
      document.addEventListener('click', async (e) => {
        const button = e.target.closest('[data-copy-button]');
        if (!button) return;

        const pre = button.closest('pre');
        const code = pre.querySelector('code')?.textContent || pre.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          
          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');
          
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          
          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    `);

    // Thêm script vào tree
    tree.children.unshift(script);

    // Xử lý các pre elements
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        node.properties.className = ['relative group', ...(node.properties.className || [])];
        
        const button = h('button', {
          type: 'button',
          className: [
            'absolute',
            'right-4',
            'top-4',
            'p-2',
            'opacity-0',
            'group-hover:opacity-100',
            'transition-opacity',
            'rounded-lg',
            'bg-neutral-800',
            'hover:bg-neutral-700'
          ],
          'data-copy-button': ''
        }, [
          h('svg', {
            className: ['w-4', 'h-4', 'copy-icon'],
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }),
            h('path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' })
          ]),
          h('svg', {
            className: ['w-4', 'h-4', 'check-icon', 'hidden'],
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('polyline', { points: '20 6 9 17 4 12' })
          ])
        ]);

        node.children.push(button);
      }
    });
  };
}