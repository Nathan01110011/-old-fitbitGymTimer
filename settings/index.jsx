function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Date Settings</Text>}>
        <Select
          label={`Selection`}
          settingsKey="timerValue"
          options={[
            {name:"60"},
            {name:"120"},
            {name:"300"}
          ]}
        />
      </Section>
    </Page>);
}

registerSettingsPage(mySettings);
