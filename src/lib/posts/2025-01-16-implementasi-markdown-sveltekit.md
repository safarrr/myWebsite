---
title: 'blog di sveltekit'
date: '2025-01-16'
updated: '2025-01-16'
author:
  - 'safarudin'

categories:
  - 'sveltekit'
  - 'markdown'
  - 'svelte'
  - 'mdsvex'
description: 'mecoba implementasi blog di sveltekit untuk safarudin.my.id'
---

<script>
import Counter from "$lib/components/Counter.svelte"
</script>

> semua source code bisa lihat di [github](https://github.com/safarrr/myWebsite/tree/main)

# ide awal

saya memiliki ide awal bagimana jika blog tanpa harus koneksi di database (supaya ga report) dan ternyata bisa menggunakan markdown di source code langsung

# svelte dan markdown

setalah saya mencari di google, saya menemukan library yang pas untuk di pakai yaitu [mdsvex](https://mdsvex.pngwn.io/)

alesan saya memilih mdsvex karena mdsvex bisa komponent/components svelte dan juga bisa menggunakan plugin dari remark.js

seperti ini:

<Counter></Counter>

library tambahan

- [mdsvex](https://mdsvex.pngwn.io/docs) untuk markdown
- [remark-collapse](https://github.com/Rokt33r/remark-collapse/tree/master) untuk plugin collapse di markdown
- [remark-emoji](https://github.com/rhysd/remark-emoji) untuk menggunakn emoji di markdown
- [@tailwindcss/typography](https://github.com/rhysd/remark-emoji) untuk typography tailwindcss

# implementasi markdown di svelte

svelte memiliki library yang cukup sedikit di banding react jadi harus memilih dengan seksama mana yang sudah cocok dengan sveltekit

## install dan setup mdsvex

```bash
npm i -D mdsvex
```

ubah config `svelte.config.js`

```javascript
const config = {
 	extensions: ['.svelte', '.md',".svx"], //tambah extensions '.md',".svx" suapay bisa ke baca
	preprocess: [vitePreprocess(),
// masukan mdsvex ke preprocess
     mdsvex({
		extensions: ['.md'],
		remarkPlugins:[ // untuk memsukan plugin remark
		    emoji, // plugin remark-emoji
		    collapse // plugin remark-collapse
	    ]
    })
    ],
    ......
};

```

> untuk memsukan menggunakan remarkPlugins atau rehypePlugins tergantung plugin

## structure folder

```
...
└── 📁src
    └── 📁lib
        └── 📁components
        └── 📁posts // untuk menyimpan file markdown
        └── utils.ts
    └── 📁routes
        ...
        └── 📁blog
            └── 📁[post]
                └── +page.svelte
                └── +page.ts
    └── 📁style
        └── prism.css // highlight dari prismjs
    ....
```

pada file +page.svelte di folder [post]

```js
export const load:PageLoad  = async ({ params }) => {
	try {
		const post = await import(`$lib/posts/${params.post}.md`) //mengembil file markdown
		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		}
	} catch(err) {
		error(404, "not found");
	}
}
```

pada file +page.svelte

```svelte
<script lang="ts">
  ...
	let { data }: { data: PageData } = $props(); //menangkap data dari +page.svelte
	...
	const { PostContent } = data;
</script>

...

<div class="container mx-auto flex w-screen flex-col space-y-2">
	...
	<article class="prose prose-sm z-10 mt-2 min-w-full max-w-full md:prose-base">
		<PostContent />
	</article>
	...
</div>
```

## highlight untuk code

di mdsvex sudah highlight by default tapi kita harus memsukan css manual. by default mdsvex menggunkan [prismjs](https://prismjs.com/) untuk highlightnya
dengan cara download css prismjs dan import ke app.css

```css
/* app.css */
@import url(./pathto/prism.css);
```

## list blog di halaman awal

untuk ini bisa di lihat di [github Discussions](https://github.com/pngwn/MDsveX/discussions/220)
