class DropdownTest extends React.Component {
  state = {
    albumSelected: 3,
    countrySelected: 'ES-es'
  };

  albums = [
    { value: 1, artist: 'Radiohead', album: 'In Rainbows', img: 'http://www.clasesdeperiodismo.com/wp-content/uploads/2012/02/radiohead-in-rainbows.png' },
    { value: 2, artist: 'QOTSA', album: 'Sons for the Deaf', img: 'http://static.musictoday.com/store/bands/93/product_large/MUDD6669.JPG' },
    { value: 3, artist: 'Kendrick Lamar', album: 'Good Kid Maad City', img: 'https://cdn.shopify.com/s/files/1/0131/9332/products/0bd4b1846ba3890f574810dbeddddf8c.500x500x1_grande.png?v=1425070323' },
    { value: 4, artist: 'Pixies', album: 'Doolittle', img: 'http://www.resident-music.com/image/cache/data/Emilys_Packshots/Pixies/Pixies_Doolittlke-500x500.jpg', disabled: true }
  ];
  countries = [
    { value: 'EN-gb', label: 'England' },
    { value: 'ES-es', label: 'Spain'},
    { value: 'TH-th', label: 'Thailand', disabled: true },
    { value: 'EN-en', label: 'USA'}
  ];

  handleAlbumChange = (value) => {
    this.setState({albumSelected: value});
  };

  handleCountryChange = (value) => {
    this.setState({countrySelected: value});
  };

  customItem (item) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    };

    const imageStyle = {
      display: 'flex',
      width: '32px',
      height: '32px',
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    };

    return (
      <div style={containerStyle}>
        <img src={item.img} style={imageStyle}/>
        <div style={contentStyle}>
          <strong>{item.artist}</strong>
          <small>{item.album}</small>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div>
        <Dropdown
          auto={false}
          source={this.albums}
          onChange={this.handleAlbumChange}
          label='Select your favorite album'
          template={this.customItem}
          value={this.state.albumSelected}
        />
        <Dropdown
          source={this.countries}
          onChange={this.handleCountryChange}
          value={this.state.countrySelected}
        />
      </div>
    );
  }
}

return <DropdownTest />;
