import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  RNButton,
  RNContainer,
  RNText,
  RNStyles,
  RNLoader,
} from "../../common";
import { FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { useThemeColors } from "../../theme/ThemeColors";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import TicketQTY from "../../components/TicketQTY";
import { ScannedData } from "../../api/Api";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/ProfileModal";

const Scan = () => {
  const Colors = useThemeColors();
  const inputRef = useRef(null);
  const device = useCameraDevice("back") ?? null;
  const { AsyncValue } = useSelector((state) => state.Auth);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isLoading, setLoading] = useState(false);
  const [Active, SetActive] = useState("1");
  const [qrData, setQRData] = useState(null);
  const [visible, setModalvisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const handleActiveSection = ({ Id }) => SetActive(Id);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  useEffect(() => {
    if ((Active === "2" || Active === "3") && inputRef.current)
      setTimeout(() => inputRef.current?.focus(), 100);
  }, [Active]);

  const Data = [
    { Id: "1", Name: "Scan", Type: "QRCode", Content: "scannerView" },
    { Id: "2", Name: "RFCode", Type: "RFCode", Content: "renderTextView" },
    { Id: "3", Name: "Manually", Type: "Manually", Content: "renderTextView" },
  ];

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: async (codes) => {
      if (!codes || codes.length === 0 || isScanning) return;
      const firstCode = codes[0];
      if (firstCode?.value) {
        setScannedData(firstCode.value);
        setIsScanning(true);
        if (AsyncValue?.ScannerLoginId) {
          setLoading(true);
          try {
            const response = await ScannedData(
              firstCode.value,
              AsyncValue.ScannerLoginId,
              "QRCode"
            );
            if (response.ResponseCode === 0) {
              setModalvisible(true);
              setQRData(response);
            }
          } catch (error) {
          } finally {
            setLoading(false);
          }
        }
      }
    },
  });

  const scannerView = useMemo(() => {
    if (!device) {
      return (
        <View style={styles(Colors).centerView}>
          <RNText
            children="No camera device found"
            size={FontSize.font17}
            family={FontFamily.SemiBold}
            color={Colors.Red}
          />
        </View>
      );
    }
    return (
      <View>
        <View style={styles(Colors).cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        </View>
        <RNButton
          style={styles(Colors).buttonView}
          title="Reset"
          onPress={() => {
            setScannedData(null);
            setIsScanning(false);
          }}
        />
      </View>
    );
  }, [device, scannedData]);

  const renderTextView = useMemo(() => {
    const isRFCode = Active === "2";
    return (
      <View style={{ ...RNStyles.center, gap: hp(5) }}>
        <View style={{ gap: hp(0.5), ...RNStyles.center }}>
          <RNText
            children={isRFCode ? "Enter RFCode" : "Enter ID"}
            size={FontSize.font24}
            family={FontFamily.SemiBold}
            color={Colors.Black}
          />
          <RNText
            children={
              isRFCode ? "Enter your RFCode here" : "Enter your ID here"
            }
            size={FontSize.font17}
            family={FontFamily.Regular}
            color={Colors.Placeholder}
          />
        </View>
        <TextInput
          ref={inputRef}
          placeholder="01234567"
          style={styles(Colors).textInput}
          placeholderTextColor={Colors.Grey}
          keyboardType="numeric"
        />
        <RNButton
          style={styles(Colors).buttonView}
          title="Send"
          // onPress={}
        />
      </View>
    );
  }, [Active]);

  if (isLoading)
    return (
      <RNLoader
        visible={isLoading}
        style={{ backgroundColor: Colors.White }}
        color={Colors.Black}
      />
    );

  return (
    <RNContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles(Colors).container}>
              {Data.map((item) => (
                <View key={item.Id} style={{ width: wp(27) }}>
                  <RNButton
                    title={item.Name}
                    style={styles(Colors, Active === item.Id).button}
                    onPress={() => handleActiveSection(item)}
                    textStyle={styles(Colors, Active === item.Id).buttonText}
                  />
                </View>
              ))}
            </View>
            <View style={styles(Colors).contents}>
              {Active === "1" ? scannerView : renderTextView}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <TicketQTY
        visible={visible}
        hideModal={() => setModalvisible(false)}
        data={qrData}
      />
      <ProfileModal
        visible={profileModalVisible}
        data={profileData}
        hideProfileModal={() => setProfileModalVisible(false)}
      />
    </RNContainer>
  );
};

export default Scan;

const styles = (Colors, isActive = false) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: wp(7),
      marginTop: hp(3),
    },
    contents: {
      ...RNStyles.flexCenter,
      paddingBottom: hp(12),
      backgroundColor: Colors.White,
    },
    buttonView: {
      alignSelf: "center",
      backgroundColor: Colors.Purple,
      width: wp(90),
      marginTop: hp(3),
    },
    textInput: {
      width: wp(90),
      borderBottomWidth: normalize(2),
      borderBottomColor: Colors.Grey,
      fontSize: FontSize.font36,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
      textAlign: "center",
    },
    button: {
      backgroundColor: isActive ? Colors.Purple : Colors.Grey,
      marginHorizontal: wp(0),
      borderRadius: normalize(7),
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(0),
    },
    buttonText: {
      fontSize: FontSize.font14,
      color: isActive ? "#FFF" : Colors.DarkGrey,
    },
    cameraContainer: {
      alignSelf: "center",
      height: wp(80),
      width: wp(80),
      borderRadius: normalize(27),
      overflow: "hidden",
    },
    modalOverlay: {
      ...RNStyles.flexCenter,
      paddingVertical: wp(5),
      backgroundColor: Colors.modal,
    },
    modalContainer: {
      width: wp(90),
      backgroundColor: Colors.Grey,
      borderRadius: normalize(20),
      padding: wp(5),
      gap: hp(3),
    },
  });
