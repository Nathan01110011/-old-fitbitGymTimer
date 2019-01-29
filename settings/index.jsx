function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Timer Settings</Text>}>
        <Select
          label={`Timer Value`}
          settingsKey="timerValue"
          options={[
            {name:"60"},
            {name:"120"},
            {name:"300"},
            {name:"3"}
          ]}
        />
        <Select
          label={`Wallpaper Design`}
          settingsKey="wallpaperValue"
          options={[
            {name:"Blue Lines"},
            {name:"Carbon Fiber"},
            {name:"Red Triangles"}
          ]}
        />
      </Section>
    </Page>);
}

registerSettingsPage(mySettings);
