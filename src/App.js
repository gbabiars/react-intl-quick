import React, { Component } from 'react';
import {
  IntlProvider,
  addLocaleData,
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  FormattedDate,
  FormattedTime
} from 'react-intl';
import locales from './locales';

const contentMessages = defineMessages({
  count: {
    id: 'body.count',
    defaultMessage: `Look, I can pluralize {count, plural,
      one {{formattedCount} number}
      other {{formattedCount} numbers}
    }`
  },
  date: {
    id: 'body.date',
    defaultMessage: `Today is {date}`
  },
  time: {
    id: 'body.time',
    defaultMessage: `The time is {time}`
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: null,
      formats: null,
      messages: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    locales(navigator.language, ({locale, formats, messages}) => {
      this.setState({
        locale,
        formats,
        messages,
        isLoaded: true
      });
    });
  }

  render() {
    const {locale, formats, messages, isLoaded} = this.state;

    if(!isLoaded) {
      return <div>Loading...</div>
    }

    if(formats) {
      addLocaleData(formats);
    }

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div>
          <h3>
            <FormattedMessage id="header.welcome" defaultMessage="Welcome" />
          </h3>
          <div>
            <p>
              <FormattedMessage {...contentMessages.count}
                                values={{
                                  count: 1,
                                  formattedCount: <FormattedNumber value={1}/>
                                }} />
            </p>
            <p>
              <FormattedMessage {...contentMessages.count}
                                values={{
                                  count: 2000,
                                  formattedCount: <FormattedNumber value={2000}/>
                                }} />
            </p>
            <p>
              <FormattedMessage {...contentMessages.date}
                                values={{
                                  date: <FormattedDate value={new Date()} />
                                }} />
            </p>
            <p>
              <FormattedMessage {...contentMessages.time}
                                values={{
                                  time: <FormattedTime value={new Date()} />
                                }} />
            </p>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
