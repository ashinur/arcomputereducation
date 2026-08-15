# Mobile POS — Excel-to-Mobile Point of Sale System PRD

**Version:** 1.0  
**Status:** Draft  
**Author:** Product Team  
**Last Updated:** August 15, 2026

## Overview

Mobile POS turns an existing Excel-based point-of-sale spreadsheet into an installable mobile Progressive Web App. The generated app connects to a free-tier cloud database and lets Excel retrieve current orders and line items through Power Query.

## V1 Goals

- Convert an existing Excel POS workbook into a mobile checkout workflow.
- Keep setup and typical small-business operation at zero recurring cost.
- Require no custom code from the business owner.
- Support phone-camera barcode scanning and manual barcode entry fallback.
- Allow multiple authenticated staff members to use one shared dataset.
- Push sales, purchases, and line items into Excel through refreshable Power Query connections.

## Functional Scope

### App generation

- Accept an existing Excel POS file as the reference product/category structure.
- Produce the static mobile app, database setup script, and setup guide.

### Catalog and scanning

- Browse products by category.
- Scan a barcode with the device camera.
- Prompt for product creation when a scanned barcode has no match.

### Checkout

- Add products to a cart, adjust quantities, and show running totals.
- Optionally associate a sale with a customer.
- Enter cash received and calculate change due.
- Complete a sale by creating order records, decrementing stock, and generating a receipt.

### Purchasing and inventory

- Record stock purchases from vendors.
- Increment product stock after purchase receipt.
- Flag products at or below reorder thresholds as low stock.

### Records and Excel sync

- Manage basic customers and vendors.
- View sales and purchase history.
- Expose order and line-item data through a REST endpoint consumable by Excel Power Query.

## V1 Technical Approach

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | Single-file Progressive Web App | Drag-and-drop static deployment with no build step for generated apps. |
| Barcode scanning | Browser camera APIs plus a decoder library | Supports phones without dedicated scanners. |
| Backend/database | Supabase Postgres, Auth, and REST APIs | Free tier is suitable for typical small-shop volume. |
| Hosting | Netlify or Cloudflare Pages | Free static hosting. |
| Excel sync | Power Query M script | Pulls current database records into Excel on refresh. |

## Out of Scope for V1

- Native app store distribution.
- Card or digital payment processing.
- Multi-location inventory.
- Role-based permissions.
- Automated Excel-to-app sync.
- Offline transaction queueing.
