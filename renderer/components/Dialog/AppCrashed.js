import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Delete from 'components/Icon/Delete'
import { Dialog, Heading, DialogOverlay, Text, Button, Bar, Span } from 'components/UI'
import messages from './messages'

const ShowDetails = styled(Span)`
  &:hover {
    color: ${themeGet('colors.lightningOrange')};
  }
  cursor: pointer;
`

const DialogAppCrashed = ({ onCancel, onSubmit, error, history, isOpen }) => {
  const [isStackVisible, setIsStackVisible] = useState(false)
  const handleClose = () => {
    onCancel && onCancel()
    history.push('/logout')
  }

  if (!isOpen) {
    return null
  }

  const header = (
    <Flex alignItems="center" flexDirection="column" mb={4}>
      <Box color="lightningOrange" mb={2}>
        <Delete height={72} width={72} />
      </Box>
      <Heading.h1>
        <FormattedMessage {...messages.app_crashed_dialog_header} />
      </Heading.h1>
    </Flex>
  )

  const body = error && (
    <Flex alignItems="center" flexDirection="column" px={4} width={640}>
      <Text textAlign="center">
        {error.message}
        <ShowDetails
          color="gray"
          fontSize="s"
          ml={1}
          onClick={() => setIsStackVisible(!isStackVisible)}
        >
          {'('}
          <FormattedMessage
            {...messages[
              isStackVisible ? 'app_crashed_dialog_hide_stack' : 'app_crashed_dialog_show_stack'
            ]}
          />
          {')'}
        </ShowDetails>
      </Text>

      {isStackVisible && (
        <>
          <Bar mb={2} mt={3} mx={4} variant="light" width="100%" />
          <Text color="gray">{error.stack}</Text>
        </>
      )}
    </Flex>
  )

  const buttons = (
    <Button onClick={() => onSubmit && onSubmit(error)} variant="normal">
      <FormattedMessage {...messages.app_crashed_dialog_submit_issue} />
    </Button>
  )

  return (
    <DialogOverlay alignItems="center" justifyContent="center">
      <Dialog buttons={buttons} header={header} onClose={handleClose} width={640}>
        {body}
      </Dialog>
    </DialogOverlay>
  )
}

DialogAppCrashed.propTypes = {
  error: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withRouter(injectIntl(DialogAppCrashed))