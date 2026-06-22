---
title: 'ExcelJS Helper'
date: '2026-06-22'
description: 'A lightweight TypeScript helper library that simplifies styling cells, creating tables, and formatting Excel workbooks with ExcelJS.'
tech:
  - 'TypeScript'
  - 'ExcelJS'
  - 'Node.js'
  - 'npm'
repo: 'https://github.com/safarrr/exceljs-helper'
---

# ExcelJS Helper

**ExcelJS Helper** is a small utility library built on top of [ExcelJS](https://github.com/exceljs/exceljs) to make Excel workbook generation cleaner and more reusable. I built it around six months ago, but the idea came from an older problem I kept running into when I first started working around 2023.

## Why I Built It

Back then, I often had to generate business documents such as **Invoices**, **Purchase Orders (PO)**, and other dynamic Excel files. The data was not always simple; sometimes a single sheet needed to contain multiple invoices, each with different sections, merged cells, tables, totals, signatures, and formatting rules.

ExcelJS is powerful, but building those layouts manually can get repetitive very quickly. Every cell needs its own styling, border, alignment, merge range, and formatting. For complex documents, the code can become harder to read than the actual Excel layout.

That experience became the reason I created ExcelJS Helper: a small abstraction to make common Excel-generation tasks easier to reuse. Instead of repeating low-level cell manipulation everywhere, this package lets the report-generation code focus more on the document structure and data.

## Key Features

- Add styled text to single cells or merged cell ranges.
- Generate structured tables with headers and data rows.
- Support `colspan` and `rowspan` for more complex table layouts.
- Apply reusable cell styles for fonts, fills, borders, alignment, and number formats.
- Convert Excel column indexes to letters and back with utility functions.

## Installation

```bash
npm install exceljs-helper
```

## Example Usage

```typescript
import ExcelJS from 'exceljs';
import { text, createTableExcel } from 'exceljs-helper';

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Report');

text(sheet, { start: 'A1', end: 'D1' }, 'Sales Report', {
	font: { bold: true, size: 16 },
	alignment: { horizontal: 'center', vertical: 'middle' }
});

createTableExcel(
	sheet,
	1,
	3,
	{
		headers: ['Region', 'Q1', 'Q2', 'Growth'],
		rows: [
			['North', 12000, 13500, { value: 0.12, cellStyle: { numFmt: '0.00%' } }],
			['South', 9800, 11250, { value: 0.18, cellStyle: { numFmt: '0.00%' } }]
		]
	},
	{
		headerStyle: {
			font: { bold: true, color: { argb: 'FFFFFFFF' } },
			fill: {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FF0F172A' }
			},
			alignment: { horizontal: 'center', vertical: 'middle' }
		},
		cellStyle: {
			borderAll: { style: 'thin', color: { argb: 'FFCBD5F5' } },
			alignment: { vertical: 'middle' }
		}
	}
);

await workbook.xlsx.writeFile('report.xlsx');
```

## API Highlights

### `text(sheet, position, value, config?)`

Adds a value to a cell or merged cell range with optional styling.

### `createTableExcel(sheet, x, y, columnData, config?)`

Creates a table starting at a specific column and row. It supports plain headers, multi-row headers, merged cells, and styling at the header, column, or individual-cell level.

### `applyCellStyle(cell, style?)`

Applies a reusable style configuration to an ExcelJS cell.

### Utility Functions

- `numberToAlphabet(column)` converts a 1-based column index into an Excel column letter, such as `1` to `A` or `27` to `AA`.
- `columnToNumber(col)` converts an Excel column letter back into a 1-based index.

## Tech Stack

- **TypeScript** for type-safe library development.
- **ExcelJS** as the spreadsheet generation engine.
- **Node.js** and **npm** for packaging and distribution.

The package is open source under the MIT license and available on GitHub.
