import React, { useState, useEffect } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColors } from "../theme/ThemeColors";
import { RNButton, RNImage, RNStyles, RNText } from "../common";
import { FontFamily, FontSize, hp, normalize, wp } from "../theme";
import { Images } from "../constants";
import { ScannedTicket } from "../api/Api";
import { useSelector } from "react-redux";
import ResponseModal from "./ResponseModal";

export default function TicketQTY({ visible, hideModal, data }) {
  const { AsyncValue } = useSelector((state) => state.Auth);
  const Colors = useThemeColors();
  const [persons, setPersons] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponseModal, setShowResponseModal] = useState(true);
  const scannedPersons = data?.TotalSacnnerTicketQty;
  const TotalScannerPersons = persons.filter(
    (person) => person.checked && !person.disabled
  ).length;
  console.log(TotalScannerPersons);

  useEffect(() => {
    if (data) {
      const totalPersons = Math.max(
        (data?.TotalBookTicket ?? 0) - (data?.TotalShareTicket ?? 0),
        0
      );
      setPersons(
        Array.from({ length: totalPersons }, (_, index) => ({
          checked: index < scannedPersons,
          disabled: index < scannedPersons,
        }))
      );
    }
  }, [data, scannedPersons]);

  const handleCheckboxPress = (index) => {
    setPersons((prevPersons) => {
      if (prevPersons[index].disabled) return prevPersons;

      const isChecked = !prevPersons[index].checked;
      return prevPersons.map((person, i) => ({
        ...person,
        checked: isChecked ? i <= index : i < index ? person.checked : false,
      }));
    });
  };

  const handleProceed = async () => {
    try {
      const response = await ScannedTicket(
        data.BookTicketDeatils,
        AsyncValue.ScannerLoginId,
        TotalScannerPersons
      );
      if (response.ResponseCode === 0) {
        hideModal();
        setTimeout(() => {
          setResponseMessage(response.ResponseMessage);
          setShowResponseModal(true);
        }, 300);
      }
    } catch (error) {}
  };

  const CustomCheckbox = ({ checked, disabled, onPress }) => (
    <TouchableOpacity onPress={disabled ? null : onPress} hitSlop={20}>
      <View
        style={[
          styles(Colors).checkbox,
          {
            backgroundColor: checked ? Colors.Purple : "#bfbfbf",
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {checked && (
          <RNImage
            source={Images.checkmark}
            style={{ width: wp(4), height: wp(4) }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal transparent={true} visible={visible} animationType="slide">
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <View style={styles(Colors).modalContents}>
            <View style={{ height: 60, ...RNStyles.flexRowBetween }}>
              <View>
                <RNText size={FontSize.font20}>
                  {data?.TicketType} - {data?.TotalAvailableTicket} Tickets
                </RNText>
              </View>
              <TouchableOpacity onPress={hideModal}>
                <RNImage
                  source={Images.close}
                  style={{ width: wp(8), height: wp(8) }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: "#e6e6e6",
                padding: wp(4),
                borderLeftWidth: 3,
                borderLeftColor: Colors.Purple,
                borderRadius: normalize(10),
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ paddingBottom: hp(2) }}>
                {persons.map((person, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      ...RNStyles.flexRowBetween,
                      paddingVertical: hp(1.5),
                    }}
                    onPress={() => handleCheckboxPress(index)}
                  >
                    <RNText size={FontSize.font18} family={FontFamily.Light}>
                      Person {index + 1}
                    </RNText>
                    <CustomCheckbox
                      checked={person.checked}
                      disabled={person.disabled}
                      onPress={() => handleCheckboxPress(index)}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <RNButton
              disable={TotalScannerPersons <= 0}
              style={[
                styles(Colors).buttonView,
                {
                  backgroundColor:
                    TotalScannerPersons <= 0
                      ? Colors.Placeholder
                      : Colors.Purple,
                },
              ]}
              title="Proceed"
              onPress={handleProceed}
            />
          </View>
        </Animated.View>
      </Modal>

      {showResponseModal && (
        <ResponseModal
          message={responseMessage}
          onClose={() => setShowResponseModal(false)}
        />
      )}
    </>
  );
}

const styles = (Colors) =>
  StyleSheet.create({
    modalContents: {
      backgroundColor: "#f2f2f2",
      paddingHorizontal: wp(4),
      paddingVertical: hp(1),
      width: wp(100),
      height: hp(70),
      borderRadius: normalize(20),
      gap: hp(2),
    },
    checkbox: {
      width: wp(6),
      height: wp(6),
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    ProceedButton: {
      backgroundColor: Colors.Purple,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonView: {
      alignSelf: "center",

      width: wp(90),
      marginBottom: hp(2),
    },
  });
