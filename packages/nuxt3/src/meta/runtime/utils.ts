export const needImmediateLoading = (strategy) => {
  if (strategy === 'onIdle') { return false }

  // if the document is already in the right state, change the strategy to `immediate`
  if (process.client && document.readyState !== 'loading') {
    return document.readyState === 'complete' || strategy === 'onInteractive'
  }
}

export const loadOnReadyStateChange = (strategy, useMetaCb) => {
  document.addEventListener('readystatechange', () => {
    const mapStrategy = {
      onInteractive: 'interactive',
      onLoad: 'complete'
    } as const

    if (document.readyState === mapStrategy[strategy]) {
      useMetaCb()
    }
  })
}

export const loadOnIdle = (useMetaCb) => {
  if (document.readyState === 'complete') {
    requestIdleCallback(useMetaCb)
  } else {
    window.addEventListener('load', () => requestIdleCallback(useMetaCb))
  }
}

export const requestIdleCallback =
  (typeof self !== 'undefined' &&
    self.requestIdleCallback &&
    self.requestIdleCallback.bind(window)) ||
  function (cb: IdleRequestCallback): number {
    const start = Date.now()
    return setTimeout(function () {
      // eslint-disable-next-line node/no-callback-literal
      cb({
        didTimeout: false,
        timeRemaining () {
          return Math.max(0, 50 - (Date.now() - start))
        }
      })
    }, 1) as unknown as number
  }
