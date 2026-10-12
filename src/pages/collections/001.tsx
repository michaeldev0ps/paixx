import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  collection001Product,
  formatPrice,
  getHoodieVariant,
  getHoodieVariantForOptions,
  hoodieVariants,
  type HoodieColor,
  type HoodieStyle,
  type HoodieVariant,
} from '../../data/collection-001';
import {
  addCartItem,
  cartTotalCents,
  changeCartQuantity,
  COLLECTION_001_CART_STORAGE_KEY,
  parseStoredCart,
  removeCartItem,
  type CartLine,
} from '../../lib/collection-001-cart';
import styles from '../../styles/collection-001.module.css';

export default function Collection001Page() {
  const [color, setColor] = useState<HoodieColor>('black');
  const [style, setStyle] = useState<HoodieStyle>('paixx');
  const [quantity, setQuantity] = useState('1');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [writePending, setWritePending] = useState(false);
  const [cartError, setCartError] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [savedCartInvalid, setSavedCartInvalid] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const selectedVariant = getHoodieVariantForOptions(color, style);
  const requestedQuantity = Number(quantity);
  const validQuantity =
    Number.isSafeInteger(requestedQuantity) && requestedQuantity > 0;

  useEffect(() => {
    try {
      const result = parseStoredCart(
        window.localStorage.getItem(COLLECTION_001_CART_STORAGE_KEY),
      );
      if (result.ok) {
        setCart(result.lines);
      } else {
        setCartError(result.message);
        setSavedCartInvalid(true);
      }
    } catch {
      setStorageAvailable(false);
      setStorageNotice(
        'Saved cart storage is unavailable in this browser. Your current selection can still be used, but it will not persist after you leave.',
      );
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded || !writePending || !storageAvailable) {
      return;
    }

    try {
      window.localStorage.setItem(
        COLLECTION_001_CART_STORAGE_KEY,
        JSON.stringify(cart),
      );
      setWritePending(false);
    } catch {
      setStorageAvailable(false);
      setStorageNotice(
        'Your cart could not be saved in this browser. It remains available until you leave this page.',
      );
    }
  }, [cart, cartLoaded, storageAvailable, writePending]);

  const handleAddToCart = () => {
    if (!validQuantity) {
      setCartError('Enter a whole quantity of at least one.');
      setCartMessage('');
      return;
    }

    const result = addCartItem(cart, selectedVariant.id, requestedQuantity);
    if (!result.ok) {
      setCartError(result.message);
      setCartMessage('');
      return;
    }

    setCart(result.lines);
    setWritePending(true);
    setCartError('');
    setCartMessage(
      `${requestedQuantity} ${requestedQuantity === 1 ? 'hoodie' : 'hoodies'} added to your cart.`,
    );
  };

  const handleQuantityChange = (variantId: CartLine['variantId'], next: number) => {
    const result = changeCartQuantity(cart, variantId, next);
    if (!result.ok) {
      setCartError(result.message);
      return;
    }

    setCart(result.lines);
    setWritePending(true);
    setCartError('');
    setCartMessage('');
  };

  const clearCart = () => {
    setCart([]);
    setWritePending(true);
    setCartError('');
    setSavedCartInvalid(false);
    setCartMessage('Your cart has been cleared.');
  };

  const totalItems = cart.reduce(
    (total, line) => total + BigInt(line.quantity),
    0n,
  );

  return (
    <>
      <Head>
        <title>Collection 001: Rage Hoodie | PAIXX</title>
        <meta
          name="description"
          content="Explore the Collection 001 Rage Hoodie. Choose your color and front design."
        />
      </Head>

      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.wordmark} href="/" aria-label="PAIXX home">
            PAIXX
          </Link>
          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href="/#collection-001">Collection 001</Link>
            <a href="#cart" aria-label={`Cart, ${totalItems.toString()} items`}>
              Cart{' '}
              <span className={styles.cartCount}>{totalItems.toString()}</span>
            </a>
          </nav>
        </header>

        <section className={styles.product} aria-labelledby="product-title">
          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <Image
                className={styles.productImage}
                src={selectedVariant.image}
                alt={`${selectedVariant.colorLabel} Rage Hoodie, front and back, with ${selectedVariant.styleLabel} artwork`}
                width={1200}
                height={800}
                priority
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
            <p className={styles.imageCaption}>
              Front and back view · {selectedVariant.colorLabel} ·{' '}
              {selectedVariant.styleLabel}
            </p>
          </div>

          <div className={styles.details}>
            <p className={styles.eyebrow}>{collection001Product.collection}</p>
            <h1 id="product-title">{collection001Product.name}</h1>
            <p className={styles.tagline}>{collection001Product.tagline}</p>
            <p className={styles.price}>{formatPrice(selectedVariant.priceCents)}</p>
            <p className={styles.description}>
              Choose a color and front design to see the matching hoodie.
            </p>

            <fieldset className={styles.optionGroup}>
              <legend>
                Color <span>{selectedVariant.colorLabel}</span>
              </legend>
              <div className={styles.optionButtons}>
                {(['black', 'white'] as const).map((option) => {
                  const label = option === 'black' ? 'Black' : 'White';
                  return (
                    <button
                      className={`${styles.colorOption} ${
                        color === option ? styles.selectedOption : ''
                      }`}
                      type="button"
                      key={option}
                      aria-pressed={color === option}
                      onClick={() => setColor(option)}
                    >
                      <span
                        className={`${styles.swatch} ${
                          option === 'black' ? styles.blackSwatch : styles.whiteSwatch
                        }`}
                        aria-hidden="true"
                      />
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className={styles.optionGroup}>
              <legend>
                Front design <span>{selectedVariant.styleLabel}</span>
              </legend>
              <div className={styles.optionButtons}>
                {(['paixx', 'demon'] as const).map((option) => {
                  const label = option === 'paixx' ? 'PAIXX logo' : 'Demon';
                  return (
                    <button
                      className={`${styles.styleOption} ${
                        style === option ? styles.selectedOption : ''
                      }`}
                      type="button"
                      key={option}
                      aria-pressed={style === option}
                      onClick={() => setStyle(option)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {!validQuantity && (
              <p className={styles.quantityError} id="quantity-error" role="alert">
                Enter a whole quantity of at least one.
              </p>
            )}
            <div className={styles.purchaseControls}>
              <label className={styles.quantityLabel} htmlFor="product-quantity">
                Quantity
              </label>
              <input
                id="product-quantity"
                className={styles.quantityInput}
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                aria-invalid={!validQuantity}
                aria-describedby={!validQuantity ? 'quantity-error' : undefined}
              />
              <button
                className={styles.addButton}
                type="button"
                onClick={handleAddToCart}
                disabled={!cartLoaded || !validQuantity}
              >
                {cartLoaded ? 'Add to cart' : 'Loading cart…'}
              </button>
            </div>

            <p className={styles.checkoutNote}>
              Cart is saved on this device. Checkout and payment are not yet
              available.
            </p>
          </div>
        </section>

        <section className={styles.cart} id="cart" aria-labelledby="cart-title">
          <div className={styles.cartHeader}>
            <div>
              <p className={styles.eyebrow}>Your selection</p>
              <h2 id="cart-title">Cart ({totalItems.toString()})</h2>
            </div>
            {cart.length > 0 && (
              <button className={styles.textButton} type="button" onClick={clearCart}>
                Clear cart
              </button>
            )}
          </div>

          {cartError && (
            <div className={styles.noticeError} role="alert">
              <p>{cartError}</p>
              {savedCartInvalid && (
                <button className={styles.textButton} type="button" onClick={clearCart}>
                  Start fresh
                </button>
              )}
            </div>
          )}
          {storageNotice && (
            <p className={styles.noticeError} role="alert">
              {storageNotice}
            </p>
          )}
          {cartMessage && (
            <p className={styles.noticeSuccess} role="status">
              {cartMessage}
            </p>
          )}

          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            <>
              <ul className={styles.cartLines}>
                {cart.map((line) => {
                  const variant = getHoodieVariant(line.variantId);

                  return (
                    <li className={styles.cartLine} key={line.variantId}>
                      <div>
                        <h3>
                          {variant.colorLabel} · {variant.styleLabel}
                        </h3>
                        <p>{formatPrice(variant.priceCents)} each</p>
                      </div>
                      <div className={styles.cartLineActions}>
                        <button
                          className={styles.quantityButton}
                          type="button"
                          aria-label={`Decrease ${variant.colorLabel} ${variant.styleLabel} quantity`}
                          disabled={line.quantity <= 1}
                          onClick={() =>
                            handleQuantityChange(line.variantId, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span aria-label={`Quantity ${line.quantity}`}>
                          {line.quantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          type="button"
                          aria-label={`Increase ${variant.colorLabel} ${variant.styleLabel} quantity`}
                          onClick={() =>
                            handleQuantityChange(line.variantId, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className={styles.textButton}
                          type="button"
                          onClick={() => {
                            setCart((items) => removeCartItem(items, line.variantId));
                            setWritePending(true);
                            setCartError('');
                            setCartMessage('');
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.cartTotal}>
                <span>Estimated total</span>
                <strong>{formatPrice(cartTotalCents(cart))}</strong>
              </div>
            </>
          )}
        </section>

        <footer className={styles.footer}>
          <span>PAIXX</span>
          <span>Wear the War. Earn the Peace.</span>
        </footer>
      </main>
    </>
  );
}
