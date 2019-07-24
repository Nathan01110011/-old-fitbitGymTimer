function mySettings(props) {
  return (
    <Page>

    <Section
    title={<Text bold align="center">Color Settings</Text>}>
    <ColorSelect
    label={`Colour`}
      settingsKey="backgroundColor"
      colors={[
        {color: '#000000', value: '1'},
        {color: '#943126', value: '2'},
        {color: '#B7950B', value: '3'},
        {color: '#196F3D', value: '4'},
        {color: '#17A589', value: '5'},
        {color: '#1B4F72', value: '6'}
      ]}
    />
  </Section>
      <Section
        title={<Text bold align="center">Timer Settings</Text>}>
        <Select
          label={`Timer Value`}
          settingsKey="timerValue"
          options={[
            {name:"30"},
            {name:"60"},
            {name:"120"},
            {name:"300"}
          ]}
        />
        </Section>

    </Page>);
}

registerSettingsPage(mySettings);
