import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';

export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount(
    { mapApi, refName, typeField, indexItem, inputName } = this.props,
  ) {
    this.searchBox = new mapApi.places.Autocomplete(this[refName]);
    this.searchBox.setComponentRestrictions({ country: 'vn' });
    this.searchBox.addListener('place_changed', this.onPlacesChanged);

    const inp = this.props[inputName];

    if (typeField === 'array') {
      if (inp && inp[indexItem]) {
        const { location } = inp[indexItem];
        this[refName].value = location.input.value ? location.input.value : '';
      }
    } else {
      this[refName].value = inp.input.value;
    }
  }

  componentWillUnmount({ mapApi, refName } = this.props) {
    mapApi.event.clearInstanceListeners(this[refName]);
  }

  onPlacesChanged = () => {
    const place = this.searchBox.getPlace();
    const {
      refName,
      typeField,
      pickupLat,
      pickupLong,
      indexItem,
      inputName,
    } = this.props;

    const inp = this.props[inputName];

    if (typeField === 'array') {
      if (inp && inp[indexItem]) {
        const { lat, log, location } = inp[indexItem];
        if (place.geometry) {
          location.input.onChange(place.name);
          lat.input.onChange(place.geometry.location.lat());
          log.input.onChange(place.geometry.location.lng());
        } else {
          location.input.onChange(place.name);
          lat.input.onChange(0);
          log.input.onChange(0);
        }
      }
    } else {
      if (place.geometry) {
        inp.input.onChange(place.name);
        pickupLat.input.onChange(place.geometry.location.lat());
        pickupLong.input.onChange(place.geometry.location.lng());
      } else {
        inp.input.onChange(place.name);
        pickupLat.input.onChange(0);
        pickupLong.input.onChange(0);
      }
    }

    // this[refName].blur();
  };

  clearSearchBox() {
    const { refName } = this.props;
    this[refName].value = '';
  }

  render() {
    const { refName, label, placeholder } = this.props;
    return (
      <FormGroup className='form-group--custom'>
        <label>{label}</label>
        <input
          ref={(ref) => {
            this[refName] = ref;
          }}
          type='text'
          placeholder={placeholder || 'Enter a location'}
          className='form-control'
        />
      </FormGroup>
    );
  }
}
