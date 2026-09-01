# PAIXX Founder To-do

This checklist contains founder inputs needed to move PAIXX from its current Deno foundation toward production commerce. Return answers by section and item number. Never send secrets in chat; credentials belong in encrypted deployment environment variables.

## 1. Brand and product identity

- [ ] Confirm the final PAIXX logo asset and allowed logo treatments (light/dark backgrounds, favicon, header, entrance animation).
- [ ] Approve the black, white, and blood-red editorial visual direction.
- [ ] Approve blood/paint animation intensity, frequency, and reduced-motion behavior for public launch.
- [ ] Confirm collection names, descriptions, and display order.
- [ ] Provide or approve final About/Story copy.
- [ ] Provide official social links and public contact/support email.

## 2. Product catalog

For every product, provide or approve:

- [ ] Final name and collection.
- [ ] Description, materials, care, and origin/manufacturing statement.
- [ ] Front, back, detail, and optional editorial photography.
- [ ] Available sizes and approved measurements/size guide.
- [ ] Price, currency, and availability state (available, pre-order, sold out, or private access).
- [ ] SKU or internal product identifier.
- [ ] Whether “Access on request” remains for products without public prices.

## 3. Checkout, shipping, and payments

- [ ] Choose and approve the payment provider.
- [ ] Confirm countries, currencies, and payment methods.
- [ ] Confirm shipping regions, fees, delivery timelines, and tracking.
- [ ] Confirm returns, exchanges, cancellations, refunds, and damaged-item rules.
- [ ] Confirm tax/VAT handling and legal business name/address at checkout.
- [ ] Decide whether guest checkout is allowed or accounts are required.
- [ ] Confirm order-confirmation and customer-support email workflow.
- [ ] Provide production credentials only through encrypted deployment variables when implementation is ready.

## 4. Authentication and customer accounts

- [ ] Confirm whether Supabase Auth/Postgres remains approved.
- [ ] Define signed-in features: order history, saved items, private drops, early access, or other access.
- [ ] Approve account creation, password reset, email verification, and session-expiry behavior.
- [ ] Provide approved account, privacy, and consent wording.
- [ ] Confirm account-recovery/support contact.

## 5. Content and editorial direction

- [ ] Provide final Journal copy where current text is draft/placeholder.
- [ ] Provide Behind-the-Scenes copy, captions, credits, and image/video usage rights.
- [ ] Approve article dates, authors/bylines, reading-time display, and category/tag vocabulary.
- [ ] Decide whether Journal needs a CMS at launch or can remain code-managed initially.

## 6. Deployment and launch

- [ ] Confirm the production deployment target and temporary preview URL policy.
- [ ] Provide production domain and DNS access when launch preparation begins.
- [ ] Confirm launch date, preview audience, and whether a temporary access gate is needed.
- [ ] Choose analytics and error-monitoring platforms, including consent requirements.
- [ ] Provide preferred SEO titles/descriptions and social preview wording for home, collections, products, and Journal.
- [ ] Confirm launch regions and location-specific legal requirements.

## 7. Deferred approvals

- [ ] Approve activation of authentication.
- [ ] Approve activation of payments/order processing.
- [ ] Approve CMS/admin tooling.
- [ ] Approve deletion/retirement of historical Node/Next files.
- [ ] Approve any major framework or hosting change from the Deno-first direction.

## How to return answers

Reply with item numbers, for example:

```text
1.1 Final logo: approved asset is ...
2.1 Product data: approved / needs revision ...
3.1 Payment provider: ...
6.1 Production domain: ...
```

Attach assets by file path or repository upload. Never paste API keys, passwords, private tokens, payment secrets, or customer data into chat.

## Engineering that can continue without these answers

Responsive/accessibility work, route and static-export validation, Journal and Behind-the-Scenes structure, product UI/data architecture, tests, documentation, and deployment hygiene can continue. Authentication, payments, customer data, and production order processing remain disabled until the relevant decisions are confirmed.
