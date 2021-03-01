import React from 'react'

const styles = {
  message: {
    background: 'green',
    width: '80%',
    height: 50,
  },
  error: {
    background: 'red',
    width: '80%',
    height: 50,
  },
}
const MessageError = ({ children, message, error }) => {
  return (
    <>
      {error ? (
        <div style={styles.error}>{children}</div>
      ) : message ? (
        <div style={styles.message}>{children}</div>
      ) : (
        ''
      )}
    </>
  )
}

export default MessageError
